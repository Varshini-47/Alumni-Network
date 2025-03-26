import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";
import uploadToCloudinary from "../cloudinaryupload";
import nitcImage from "../assets/NIT-calicut-1024x576.webp";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaIdBadge,
  FaUniversity,
  FaCamera,
  FaArrowLeft,
  FaSave,
  FaTimesCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function UpdateProfile() {
  const { user, fetchUserData } = useUser();
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const departmentOptions = [
    "Computer Science and Engineering",
    "Electronics and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Architecture",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Other",
  ];

  useEffect(() => {
    // Set initial image preview if user has an image
    if (updatedUser.imageUrl) {
      setImagePreview(updatedUser.imageUrl);
    }
  }, [updatedUser.imageUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }

    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Clean up image preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== updatedUser.imageUrl) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, updatedUser.imageUrl]);

  const validateForm = () => {
    const newErrors = {};

    if (!/^\d{10}$/.test(updatedUser.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!/^\d{4}$/.test(updatedUser.batch)) {
      newErrors.batch = "Batch must be a 4-digit year";
    }

    if (!updatedUser.department?.trim()) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      // Scroll to the first error
      const firstErrorField = document.querySelector(".border-red-500");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setUploading(true);
    let uploadedImageUrl = updatedUser.imageUrl;

    if (image) {
      try {
        uploadedImageUrl = await uploadToCloudinary(image);
      } catch (uploadError) {
        toast.error("Image upload failed. Please try again.");
        setUploading(false);
        return;
      }
    }

    try {
      await axios.put(
        `http://localhost:8080/api/users/${user.id}/updateProfile`,
        { ...updatedUser, imageUrl: uploadedImageUrl },
        { withCredentials: true }
      );
      await fetchUserData(user.id);
      toast.success("Profile updated successfully!");
      navigate(`/profile/${user.id}`);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "Update failed! Please try again.";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Page header with navigation */}
        <div className="mb-6">
          <Link
            to={`/profile/${user.id}`}
            className="inline-flex items-center text-blue-400 hover:text-blue-600 mb-2"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to Profile</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaUser className="text-blue-600" />
            <span>Update Your Profile</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Keep your information up-to-date to stay connected with the alumni
            network
          </p>
        </div>

        {/* Main form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Card header */}
          <div className="bg-gradient-to-r from-blue-400 to-indigo-600 p-6 text-white">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <p className="text-blue-100">Update your profile details</p>
          </div>

          {/* Form content */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile image section */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-100 shadow-md">
                      <img
                        src={
                          imagePreview ||
                          "https://res.cloudinary.com/dcsomu9n6/image/upload/v1742667126/qkeb6zjwjoyygy4w51bz.webp"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 rounded-full">
                        <FaCamera className="text-white text-2xl" />
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    Click on the image to upload a new photo
                  </p>
                </div>

                {/* Form fields */}
                <div className="w-full md:w-2/3 space-y-6">
                  {/* Non-editable fields */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Account Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            value={updatedUser.firstName}
                            readOnly
                            className="w-full p-3 pl-10 border rounded-lg bg-gray-100 cursor-not-allowed"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="email"
                            value={updatedUser.email}
                            readOnly
                            className="w-full p-3 pl-10 border rounded-lg bg-gray-100 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Editable fields */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Personal Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-3 top-3 text-blue-500" />
                          <input
                            type="text"
                            name="phone"
                            placeholder="10-digit phone number"
                            value={updatedUser.phone || ""}
                            onChange={handleChange}
                            className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 transition ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Batch */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Batch Year <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FaGraduationCap className="absolute left-3 top-3 text-blue-500" />
                          <input
                            type="text"
                            name="batch"
                            placeholder="e.g., 2025"
                            value={updatedUser.batch || ""}
                            onChange={handleChange}
                            className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 transition ${
                              errors.batch
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.batch && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.batch}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Roll Number */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Roll Number
                        </label>
                        <div className="relative">
                          <FaIdBadge className="absolute left-3 top-3 text-blue-500" />
                          <input
                            type="text"
                            name="rollNo"
                            placeholder="Your roll number"
                            value={updatedUser.rollNo || ""}
                            onChange={handleChange}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>

                      {/* Department */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Department <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FaUniversity className="absolute left-3 top-3 text-blue-500" />
                          <select
                            name="department"
                            value={updatedUser.department || ""}
                            onChange={handleChange}
                            className={`w-full p-3 pl-10 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 transition ${
                              errors.department
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="">Select Department</option>
                            {departmentOptions.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.department && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.department}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 mt-6">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-gradient-to-r from-blue-400 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-500 hover:to-indigo-700 transition-all disabled:opacity-70"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <FaSave />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                >
                  <FaTimesCircle />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UpdateProfile;

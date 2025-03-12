import { useState } from "react";
import { useUser } from "../UserContext";
import nitc from "../assets/NIT-calicut-1024x576.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadToCloudinary from "../cloudinaryupload";
import {
  FaTrophy,
  FaCalendarAlt,
  FaTag,
  FaFileAlt,
  FaBuilding,
  FaPaperPlane,
} from "react-icons/fa";

const AchievementsForm = () => {
  const { user } = useUser();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    dateOfAchievement: "",
    category: "",
    description: "",
    supportingDocuments: null,
    organization: "",
    userId: user.id,
  });

  const handleChange = async (e) => {
    if (e.target.name === "supportingDocuments") {
      setUploading(true);
      const uploadedImageUrl = await uploadToCloudinary(e.target.files[0]);
      setUploading(false);
      setFormData({ ...formData, supportingDocuments: uploadedImageUrl });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Achievement:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/achievements",
        formData,
        { withCredentials: true }
      );
      console.log("Response:", response.data);
      alert("Achievement Added Successfully!");
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to Add Achievement");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${nitc})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>

      <div className="relative bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center">
          Add Achievement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaTrophy className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="title"
              placeholder="Achievement Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="date"
              name="dateOfAchievement"
              value={formData.dateOfAchievement}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="relative">
            <FaTag className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="relative">
            <textarea
              name="description"
              placeholder="📝 Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              rows="4"
            ></textarea>
          </div>

          <div className="relative">
            <FaFileAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="file"
              name="supportingDocuments"
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="relative">
            <FaBuilding className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="organization"
              placeholder="Recognizing Organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg text-lg font-bold shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:bg-opacity-90"
          >
            {uploading ? "Uploading..." : "Add Achievement"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AchievementsForm;

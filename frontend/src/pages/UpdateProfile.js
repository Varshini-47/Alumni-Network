import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext"; 
import uploadToCloudinary from "../cloudinaryupload";
import nitcImage from "../assets/NIT-calicut-1024x576.webp";
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaIdBadge, FaUniversity } from "react-icons/fa";

function UpdateProfile() {
    const { user, fetchUserData } = useUser(); 
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setUploading(true);
        let uploadedImageUrl = updatedUser.imageUrl;

        if (image) {
            try {
                uploadedImageUrl = await uploadToCloudinary(image);
            } catch (uploadError) {
                setError("Image upload failed. Try again.");
                setUploading(false);
                return;
            }
        }
        console.log(user.id);
        try {
            await axios.put(
                `http://localhost:8080/api/users/${user.id}/updateProfile`,
                { ...updatedUser, imageUrl: uploadedImageUrl },
                { withCredentials: true }
            );
            fetchUserData(user.id); 
            alert("Profile updated successfully!");
            navigate(`/profile/${user.id}`);
        } catch (error) {
            setError(error.response ? error.response.data : "Update failed! Try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center" style={{ backgroundImage: `url(${nitcImage})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>
            <div className="relative bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200 z-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Profile</h2>

                {error && <p className="text-red-600 text-center">{error}</p>} {/* Display error */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-500" />
                        <input type="text" name="name" placeholder="First Name" value={updatedUser.firstName}  readOnly className="w-full pl-10 p-3 border rounded-lg shadow-sm bg-gray-200 cursor-not-allowed"  />
                    </div>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                        <input type="email" name="email" placeholder="Email" value={updatedUser.email} readOnly className="w-full pl-10 p-3 border rounded-lg shadow-sm bg-gray-200 cursor-not-allowed" />
                    </div>
                    <div className="relative">
                        <FaPhone className="absolute left-3 top-3 text-gray-500" />
                        <input type="text" name="phone" placeholder="Phone Number" value={updatedUser.phone} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg shadow-sm" required />
                    </div>
                    <div className="relative">
                        <FaGraduationCap className="absolute left-3 top-3 text-gray-500" />
                        <input type="text" name="batch" placeholder="Batch (e.g., 2025)" value={updatedUser.batch} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg shadow-sm" required />
                    </div>
                    <div className="relative">
                        <FaIdBadge className="absolute left-3 top-3 text-gray-500" />
                        <input type="text" name="rollNo" placeholder="Roll Number" value={updatedUser.rollNo} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg shadow-sm" />
                    </div>
                    <div className="relative">
                        <FaUniversity className="absolute left-3 top-3 text-gray-500" />
                        <input type="text" name="department" placeholder="Department" value={updatedUser.department} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg shadow-sm" required />
                    </div>
                    <input type="file" className="w-full p-3 border rounded-lg shadow-sm" onChange={handleFileChange} />
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg text-lg font-bold shadow-md hover:scale-105 transition-transform duration-200">
                        {uploading ? "Uploading..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;

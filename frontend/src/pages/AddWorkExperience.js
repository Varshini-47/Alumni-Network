import { useState } from "react";
import { useUser } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import nitc from "../assets/NIT-calicut-1024x576.webp";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";

const AddWorkExperienceForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isPresent, setIsPresent] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    isPresent: "",
    company: "",
    role: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = { ...formData, user: { id: user.id } };
      await axios.post(
        "http://localhost:8080/api/work-experience",
        requestData,
        {
          withCredentials: true,
        }
      );
      alert("Work Experience Added Successfully!");
      navigate(`/profile/${user.id}`);
    } catch (error) {
      alert("Failed to Add Work Experience");
    }
  };

  const handleCheckboxChange = () => {
    if (isPresent) {
      setFormData({ ...formData });
    } else {
      setFormData({ ...formData, endDate: "", isPresent: true });
    }
    setIsPresent(!isPresent);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${nitc})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>

      <div className="relative bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200 z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Work Experience
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div className="relative flex items-center space-x-4">
            <div className="relative flex-grow">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="date"
                name="endDate"
                value={isPresent ? "" : formData.endDate}
                onChange={handleChange}
                disabled={isPresent}
                className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-200"
              />
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isPresent}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-blue-500 focus:ring-blue-500"
              />
              <span>Present</span>
            </label>
          </div>

          <div className="relative">
            <FaBuilding className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div className="relative">
            <FaUserTie className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg text-lg font-bold shadow-md hover:scale-105 transition-transform duration-200"
          >
            Add Experience
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWorkExperienceForm;

import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import nitc from "../assets/NIT-calicut-1024x576.webp";
import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";

const EditWorkExperienceForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [present, setPresent] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    company: "",
    role: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:8080/api/work-experience/${id}`);
        const data = response.data;
        const formatDate = (dateArray) => {
          if (!dateArray || dateArray.length !== 3) return "";
          const [year, month, day] = dateArray;
          return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        };

        setFormData({
          ...data,
          startDate: formatDate(data.startDate),
          endDate: data.endDate ? formatDate(data.endDate) : "",
        });
        setPresent(data.endDate == null);
      } catch (error) {
        setError("Failed to load work experience.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchWorkExperience();
    }
  }, [id, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePresentChange = () => {
    setPresent(!present);
    if (!present) {
      setFormData({ ...formData, endDate: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/work-experience/${id}`, formData, {
        withCredentials: true,
      });
      alert("Work Experience Updated Successfully!");
      navigate(`/profile/${user.id}`);
    } catch (error) {
      alert("Failed to Update Work Experience");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading work experience...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${nitc})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>

      <div className="relative bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200 z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Work Experience</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition" required />
          </div>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="date"
              name="endDate"
              value={present ? "" : formData.endDate}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              disabled={present}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="present" checked={present} onChange={handlePresentChange} className="w-5 h-5" />
            <label htmlFor="present" className="text-gray-700">Currently Working Here</label>
          </div>
          <div className="relative">
            <FaBuilding className="absolute left-3 top-3 text-gray-500" />
            <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition" required />
          </div>
          <div className="relative">
            <FaUserTie className="absolute left-3 top-3 text-gray-500" />
            <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition" required />
          </div>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition" required />
          </div>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition" rows="4"></textarea>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg text-lg font-bold shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:bg-opacity-90">Update Experience</button>
        </form>
      </div>
    </div>
  );
};

export default EditWorkExperienceForm;

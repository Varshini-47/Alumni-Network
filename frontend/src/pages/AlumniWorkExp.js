import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { FaBuilding, FaUserTie, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";


const WorkExperiencePage = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const { alumniId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const userId= useState(user.id);
  console.log(user);
  console.log(user.id+" uuuuuuuuu    "+alumniId);

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/work-experience/user/${alumniId}`);
        const workExpArray = Array.isArray(response.data) ? response.data.reverse() : [response.data];
        setWorkExperiences(workExpArray);
      } catch (error) {
        console.error("Error fetching work experiences:", error);
        setError("Failed to load work experience.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchWorkExperiences();
    }
  }, [user]);

  const handleDelete = async (workId) => {
    if (!window.confirm("Are you sure you want to delete this work experience?")) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/work-experience/${workId}`, { withCredentials: true });
      setWorkExperiences(workExperiences.filter(work => work.id !== workId));
    } catch (error) {
      console.error("Error deleting work experience:", error);
      alert("Failed to delete work experience.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/logout", {}, { withCredentials: true });
      logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleEdit = (workId) => {
    navigate(`/edit-work/${workId}`); // Redirect to edit page (customize this route as needed)
  };

  if (loading) return <p className="text-center text-gray-600">Loading work experiences...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Work Experience</h2>

      {/* Colored Box Wrapper */}
      <div className="bg-blue-100 p-6 rounded-xl shadow-lg w-full max-w-3xl">
        {workExperiences.length > 0 ? (
          workExperiences.map((work) => (
            <div key={work.id} className="bg-white p-5 rounded-lg shadow-md mb-4 transition-transform duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <FaBuilding className="text-blue-600" /> {work.company}
              </h3>
              <p className="text-gray-600 flex items-center gap-2">
                <FaUserTie className="text-green-600" /> {work.role}
              </p>
              <p className="text-gray-500 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> {work.location}
              </p>
              <p className="text-gray-500 flex items-center gap-2"> 
                <FaCalendarAlt className="text-yellow-500" /> {new Date(work.startDate).toLocaleDateString()} - {work.present?"Present":new Date(work.endDate).toLocaleDateString()}
              </p>
              <p className="mt-3 text-gray-700">{work.description}</p>
              {user.id == alumniId && (

                <div className="absolute top-3 right-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(work.id)}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(work.id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No work experience added yet.</p>
        )}
      </div>
    </div>
  );
};

export default WorkExperiencePage;

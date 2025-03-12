
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { FaBuilding, FaUserTie, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";


const AlumniAchievements = () => {
  const { alumniId } = useParams();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/achievements/user/${alumniId}`, { withCredentials: true });
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        setError("Failed to fetch achievements.");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [alumniId]);

  const handleDelete = async (achievementId) => {
    if (!window.confirm("Are you sure you want to delete this achievement experience?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/achievements/${achievementId}`, { withCredentials: true });
      setAchievements(achievements.filter(achievement => achievement.id !== achievementId));
    } catch (error) {
      console.error("Error deleting achievement experience:", error);
      alert("Failed to delete achievement experience.");
    }
  };

  const handleEdit = (achievementId) => {
    navigate(`/edit-achievement/${achievementId}`);
  };

  if (loading) return <p className="text-center text-gray-600">Loading achievements...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-4xl font-bold mb-6 text-gray-900">Achievements</h2>

      <div className="bg-blue-100 p-6 rounded-xl shadow-lg w-full max-w-7xl">
        {achievements.length === 0 ? (
          <p className="text-gray-600 text-center">No achievements found for this alumni.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >

                {achievement.supportingDocuments && (
                  <img
                    src={achievement.supportingDocuments}
                    alt="Achievement"
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{achievement.category}</p>
                  <p className="text-gray-500 text-sm">
                    📅 {new Date(achievement.dateOfAchievement).toLocaleDateString()}
                  </p>
                  <p className="mt-3 text-gray-700">{achievement.description}</p>
                  <p className="text-blue-600 text-sm mt-2">🏢 Recognized by: {achievement.organization}</p>
                  {user.id == alumniId && (

                    <div className="absolute top-3 right-3 flex gap-3">
                      <button
                        onClick={() => handleEdit(achievement.id)}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(achievement.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniAchievements;

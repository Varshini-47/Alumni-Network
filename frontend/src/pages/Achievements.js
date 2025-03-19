
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const AchievementsList = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/achievements/all", { withCredentials: true });
        const achievementsArray = Array.isArray(response.data) ? response.data.reverse() : [response.data];
        setAchievements(achievementsArray);
        // setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        setError("Failed to fetch achievements.");
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/achievements/${id}`, { withCredentials: true });
      setAchievements(achievements.filter(achievement => achievement.id !== id));
    } catch (error) {
      console.error("Error deleting achievement:", error);
      alert("Failed to delete achievement.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading achievements...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-4xl font-bold mb-6 text-gray-900">Achievements</h2>

      {/* Achievements Grid */}
      <div className="w-full max-w-7xl">
        {achievements.length === 0 ? (
          <p className="text-gray-600 text-center bg-white p-5 rounded-lg shadow-md">
            No achievements added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* 3 Columns on Large Screens */}
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-105 p-5"
              >
                {/* Image Section */}
                {achievement.supportingDocuments && (
                  <img
                    src={achievement.supportingDocuments}
                    alt="Achievement"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}

                {/* Content Section */}
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{achievement.category}</p>
                  <p className="text-gray-500 text-sm">
                    📅 {new Date(achievement.dateOfAchievement).toLocaleDateString()}
                  </p>
                  <p className="mt-3 text-gray-700">{achievement.description}</p>
                  <p className="text-blue-600 text-sm mt-2">🏢 Recognized by: {achievement.organization}</p>
                  <p className="text-gray-800 font-semibold mt-2">🎓 Achieved by: {achievement.alumniName}</p>
                </div>

                {/* Delete Button (Only for Admins) */}
                {user && user.role === "admin" && (
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
                  >
                    <FaTrash size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {user && user.role=="admin" && (
        <div className="col-span-2 mt-10">
        <button
          onClick={() => { navigate("/add-achievements"); }}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-10"
        >
          Add Achievement
        </button>
      </div>
      )}
    </div>
  );
};

export default AchievementsList;

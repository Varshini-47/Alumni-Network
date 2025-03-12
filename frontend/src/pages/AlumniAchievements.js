import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

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
        const response = await axios.get(
          `http://localhost:8080/api/achievements/user/${alumniId}`,
          { withCredentials: true }
        );
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

  if (loading)
    return <p className="text-center text-gray-600">Loading achievements...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-4xl font-bold mb-6 text-gray-900">Achievements</h2>
      <div className="bg-blue-100 p-6 rounded-xl shadow-lg w-full max-w-7xl">
        {achievements.length === 0 ? (
          <p className="text-gray-600 text-center">
            No achievements found for this alumni.
          </p>
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
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {achievement.category}
                  </p>
                  <p className="text-gray-500 text-sm">
                    📅{" "}
                    {new Date(
                      achievement.dateOfAchievement
                    ).toLocaleDateString()}
                  </p>
                  <p className="mt-3 text-gray-700">
                    {achievement.description}
                  </p>
                  <p className="text-blue-600 text-sm mt-2">
                    🏢 Recognized by: {achievement.organization}
                  </p>
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

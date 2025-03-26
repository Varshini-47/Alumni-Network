import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useUser } from "../UserContext";
import {
  FaAward,
  FaTrophy,
  FaMedal,
  FaCertificate,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaBuilding,
  FaArrowLeft,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AlumniAchievements = () => {
  const { alumniId } = useParams();
  const [achievements, setAchievements] = useState([]);
  const [alumniInfo, setAlumniInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const isOwnProfile = user?.id == alumniId;

  // Get icon based on achievement category
  const getCategoryIcon = (category) => {
    const categoryMap = {
      Award: <FaTrophy className="text-yellow-500" />,
      Certification: <FaCertificate className="text-blue-500" />,
      Recognition: <FaMedal className="text-purple-500" />,
      Publication: <FaAward className="text-green-500" />,
    };

    return categoryMap[category] || <FaAward className="text-indigo-500" />;
  };

  // Get background gradient based on achievement category
  const getCategoryGradient = (category) => {
    const gradientMap = {
      Award: "from-yellow-500 to-amber-600",
      Certification: "from-blue-500 to-cyan-600",
      Recognition: "from-purple-500 to-indigo-600",
      Publication: "from-green-500 to-emerald-600",
    };

    return gradientMap[category] || "from-indigo-500 to-blue-600";
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch achievements
        const achievementsResponse = await axios.get(
          `http://localhost:8080/api/achievements/user/${alumniId}`,
          { withCredentials: true }
        );
        const achievementsArray = Array.isArray(achievementsResponse.data)
          ? achievementsResponse.data
          : [achievementsResponse.data];
        setAchievements(
          achievementsArray.sort(
            (a, b) =>
              new Date(b.dateOfAchievement) - new Date(a.dateOfAchievement)
          )
        );

        // Fetch alumni info
        const alumniResponse = await axios.get(
          `http://localhost:8080/api/users/${alumniId}`,
          { withCredentials: true }
        );
        setAlumniInfo(alumniResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to fetch achievements");
        setError("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [alumniId]);

  const handleDelete = async (achievementId) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this achievement?</p>
        <div className="mt-2 flex justify-center space-x-3">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => {
              toast.dismiss();
              deleteAchievement(achievementId);
            }}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const deleteAchievement = async (achievementId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/achievements/${achievementId}`,
        { withCredentials: true }
      );
      setAchievements(
        achievements.filter((achievement) => achievement.id !== achievementId)
      );
      toast.success("Achievement deleted successfully");
    } catch (error) {
      toast.error("Failed to delete achievement");
    }
  };

  const handleEdit = (achievementId) => {
    navigate(`/edit-achievement/${achievementId}`);
  };

  // Loading state with animation
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium">Loading achievements...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with breadcrumb and actions */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Link
                to={`/profile/${alumniId}`}
                className="flex items-center hover:underline"
              >
                <FaArrowLeft className="mr-1" /> Back to Profile
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FaAward className="text-blue-600" />
              <span>Achievements & Recognitions</span>
            </h1>
            {alumniInfo && (
              <p className="text-gray-600 mt-1">
                {isOwnProfile
                  ? "Your notable accomplishments"
                  : `${alumniInfo.name}'s notable accomplishments`}
              </p>
            )}
          </div>

          {isOwnProfile && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/add-achievements")}
              className="bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              <FaPlus /> Add Achievement
            </motion.button>
          )}
        </div>

        {/* Achievements Grid */}
        {achievements.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  {/* Header with Category */}
                  <div
                    className={`bg-gradient-to-r ${getCategoryGradient(
                      achievement.category
                    )} py-3 px-6 text-white`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(achievement.category)}
                        <h3 className="font-bold">
                          {achievement.category || "Achievement"}
                        </h3>
                      </div>
                      <div className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {new Date(
                          achievement.dateOfAchievement
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Image Preview (if available) */}
                  {achievement.supportingDocuments && (
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={achievement.supportingDocuments}
                        alt={achievement.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 bg-gray-50 flex-grow flex flex-col">
                    <div className="mb-auto">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {achievement.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaBuilding className="mr-2" />
                        <span>
                          {achievement.organization ||
                            "Organization not specified"}
                        </span>
                      </div>
                      <p className="text-gray-700 line-clamp-3">
                        {achievement.description}
                      </p>
                    </div>

                    {/* Action buttons - only for own profile */}
                    {isOwnProfile && (
                      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleEdit(achievement.id)}
                          className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
                          title="Edit"
                        >
                          <FaEdit /> <span className="text-sm">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(achievement.id)}
                          className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition"
                          title="Delete"
                        >
                          <FaTrash /> <span className="text-sm">Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <div className="w-20 h-20 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <FaAward className="text-indigo-500 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {isOwnProfile
                ? "You haven't added any achievements yet"
                : "No achievements found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {isOwnProfile
                ? "Showcase your awards, certifications, and other notable accomplishments"
                : "This alumni hasn't added any achievements yet"}
            </p>
            {isOwnProfile && (
              <button
                onClick={() => navigate("/add-achievements")}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition inline-flex items-center gap-2"
              >
                <FaPlus /> Add First Achievement
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AlumniAchievements;

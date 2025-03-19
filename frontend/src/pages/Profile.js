import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaBriefcase, FaAward, FaUserEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../UserContext";
import axios from "axios";

function Profile() {
  const { user, fetchUserData, logoutUser } = useUser();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [alumni, setAlumni] = useState(null);
  const [profileType, setProfileType] = useState(user.profileType);
  const [workexp, setWorkExp] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [points, setPoints] = useState(null);
  const userId = user.id;
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`, { withCredentials: true });
        setAlumni(response.data);
        setProfileType(response.data.profileType);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);


  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}/points`, { withCredentials: true });
        setPoints(response.data.points);
      } catch (error) {
        console.error("Error fetching points:", error);
        setPoints(0);
      }
    };
    fetchPoints();
  }, [id]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfileTypeChange = async (newType) => {
    setProfileType(newType);
    try {
      await axios.put(
        `http://localhost:8080/api/users/${id}/updateProfile`,
        { profileType: newType },
        { withCredentials: true }
      );
      await fetchUserData(user.id);
      setProfileType(newType); // Update UI state
    } catch (error) {
      console.error("Error updating profile type:", error);
    }
  };

  useEffect(() => {
    const fetchWorkExp = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/work-experience/user/${id}`, { withCredentials: true });
        if (!response.ok) {
          throw new Error("Failed to fetch work experience");
        }
        const data = await response.json();
        console.log(data); // Check the structure
        setWorkExp(data[0]); // Access the nested array safely
        // setWorkExp(Array.isArray(data) ? data : [data]);
        const workExpArray = Array.isArray(data) ? data.reverse() : [data];
        setWorkExp(workExpArray);
        console.log(workexp);
        console.log(workexp.length);
      } catch (error) {
        console.error("Error fetching work experience:", error);
        setWorkExp([]);
      }
    };
    fetchWorkExp();
  }, [id]);
  console.log(workexp);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/achievements/user/${id}`, { withCredentials: true });
        if (!response.ok) {
          throw new Error("Failed to fetch achievement");
        }
        const data = await response.json();
        console.log(data); // Check the structure
        setAchievements(data[0]); // Access the nested array safely
        // setAchievements(Array.isArray(data) ? data : [data]);
        const achievementsArray = Array.isArray(data) ? data.reverse() : [data];
        setAchievements(achievementsArray);

        console.log(achievements);
        console.log(achievements.length);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        setAchievements([]);
      }
    };


    fetchAchievements();
  }, [id]);


  if (!alumni) return <div className="text-center p-6 text-gray-700">Loading...</div>;
  if (!user) {
    return (
      <div className="p-6 text-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }


  return user.role === "ALUMNI" && alumni.profileType === "PRIVATE" && userId != id ? (
    <div className="p-6 min-h-[calc(100vh-200px)] text-center text-gray-700">
      <h2 className="text-2xl font-bold">{alumni.name} {alumni.lastName}'s profile is private.</h2>
    </div>
  ) : (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 font-inter">
      {/* Profile Card */}
      <div className="container mx-auto flex flex-col md:flex-row py-12 gap-8 px-4">
        <motion.div
          className="md:w-1/3 h-[530px] bg-white p-8 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden flex flex-col items-center text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-300 to-indigo-500 rounded-t-lg"></div>
          <div className="relative mt-16">
            {alumni.imageUrl ? (
              <img
                src={alumni.imageUrl}
                alt="User"
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md hover:scale-105 transition transform duration-300"
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-gray-400 flex items-center justify-center border-4 border-white shadow-md">
                No Photo
              </div>
            )}
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">{alumni.name} {alumni.lastName}</h2>
            <p className="text-lg text-gray-600">Batch: {alumni.batch}</p>
            <p className="text-lg text-gray-600">Department: {alumni.department}</p>
            <p className="text-lg text-gray-700 mt-2">Points Earned: {points !== null ? points : "Loading..."}</p>
            {userId == id && (
              <div>
              <div className="mt-4">
                <label className="text-lg font-semibold">Profile Type:</label>
                <select
                  value={profileType}
                  onChange={(e) => handleProfileTypeChange(e.target.value)}
                  className="ml-2 px-4 py-2 border rounded-md text-gray-700"
                >
                  <option value="PUBLIC">Public</option>
                  <option value="PRIVATE">Private</option>
                </select>
              </div>
              <div className="mt-6">
              <button
                onClick={() => navigate("/update-profile")}
                className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            </div>
              </div>
            )}
            
          </div>
        </motion.div>

        {/* Work Experience & Achievements */}
        <div className="md:w-2/3 space-y-6">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-indigo-700">
                <FaBriefcase /> Work Experience
              </h3>
              <Link to={`/alumni/${id}/workexperience`} className="text-indigo-600 hover:underline">View All</Link>
            </div>
            <div className="mt-4 space-y-4">
              {workexp && workexp.length > 0 ? (
                workexp.slice(0, 2).map((exp, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg shadow">
                    <h4 className="text-lg font-semibold">{exp.role}</h4>
                    <p className="text-gray-700 font-medium">{exp.company} • {new Date(exp.startDate).toLocaleDateString()} - {exp.present?"Present":new Date(exp.endDate).toLocaleDateString()}</p>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No work experience available</p>
              )}
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-indigo-700">
                <FaAward /> Achievements
              </h3>
              <Link to={`/alumni/${id}/achievements`} className="text-indigo-600 hover:underline">View All</Link>
            </div>
            <div className="mt-4 space-y-4">
              {achievements && achievements.length > 0 ? (
                achievements.slice(0, 2).map((exp, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg shadow">
                    <h4 className="text-lg font-semibold">{exp.title} <span className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded">{exp.organization}</span></h4>
                    <p className="text-gray-700">{new Date(exp.dateOfAchievement).toLocaleDateString()}</p>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No Achievements available</p>
              )}
            </div>
          </motion.div>

          <motion.div>
            {userId == id && (
              <div className="container mx-auto pb-8 flex justify-end">
                <button onClick={toggleDropdown} className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
                  Add Details
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                    <button onClick={() => { setShowDropdown(false); navigate("/add-work-experience"); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Work Experience</button>
                    <button onClick={() => { setShowDropdown(false); navigate("/add-achievements"); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Achievements</button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
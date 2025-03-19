import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaUserGraduate, FaUsers } from "react-icons/fa"; // Added Users Icon

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users", { withCredentials: true });
      setAlumni(response.data);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this alumni?")) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${id}`, { withCredentials: true });
        setAlumni(alumni.filter((alumnus) => alumnus.id !== id));
      } catch (error) {
        console.error("Error deleting alumni:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="p-6 max-w-5xl mx-auto">
        {/* Total Alumni Count */}
        <div className="flex items-center justify-between bg-blue-300 text-black p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <FaUsers className="text-2xl" />
            <span>Total Registered Alumni: {alumni.length}</span>
          </h2>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🎓 Registered Alumni</h1>
        
        {/* Alumni List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((alumnus) => (
            <div
              key={alumnus.id}
              className="bg-white shadow-lg rounded-lg p-5 flex items-center justify-between hover:shadow-xl transition cursor-pointer"
              onClick={() => navigate(`/profile/${alumnus.id}`)}
            >
              {/* Left Section - Avatar & Info */}
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {alumnus.imageUrl ? (
                    <img src={alumnus.imageUrl} alt={alumnus.name} className="w-full h-full object-cover" />
                  ) : (
                    <FaUserGraduate className="text-gray-500 text-2xl" />
                  )}
                </div>

                {/* Alumni Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{alumnus.name}</h2>
                  <p className="text-sm text-gray-600">Batch: {alumnus.batch}</p>
                </div>
              </div>

              {/* Delete Button */}
              <button
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(alumnus.id);
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniList;

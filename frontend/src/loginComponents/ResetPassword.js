import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import alumniImage from "./assets/alumni.png";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const userId = new URLSearchParams(location.search).get("userId");

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/reset-password",
        { userId, newPassword },
        { withCredentials: true }
      );
      setMessage(response.data);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] bg-gray-100">
      {/* Left Side: Image */}
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={alumniImage}
          alt="Alumni"
          className="w-3/4 h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side: Reset Password Form */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-white-100 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handleResetPassword}
          className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Reset
        </button>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;

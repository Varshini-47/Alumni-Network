import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import nitcImage from "./assets/NIT-calicut-1024x576.webp";

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
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <div className="absolute inset-0">
        <img
          src={nitcImage}
          alt="NITC Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
      </div>
      <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg text-lg font-bold shadow-md hover:scale-105 transition-transform duration-200 mt-5"
        >
          Reset Password
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        <p
          className="mt-2 text-blue-600 cursor-pointer text-center hover:underline"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;

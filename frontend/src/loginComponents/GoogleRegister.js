import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function GoogleRegister() {
  const googleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <button
      onClick={() => googleLogin()}
      className="w-full flex items-center justify-center bg-red-400 text-white p-2 rounded hover:bg-red-600 mt-2"
    >
      <FcGoogle className="text-xl mr-2" /> Register with Google
    </button>
  );
}

export default GoogleRegister;

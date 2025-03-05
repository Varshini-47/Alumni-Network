import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const { email, given_name, family_name } = userInfoResponse.data;
        console.log(email, given_name);

        const backendResponse = await axios.post(
          "http://localhost:8080/api/google-login",
          { email, firstName: given_name, lastName: family_name },
          { withCredentials: true }
        );

        if (backendResponse.data.newUser === true) {
          alert("Not registered yet. Moving to registration page.");
          navigate("/register");
        } else {
          const { user } = backendResponse.data;
          loginUser({
            email: user.email,
            firstName: user.name,
            lastName: user.lastName,
            role: user.role,
            imageUrl: user.imageUrl,
            batch: user.batch,
            rollNo: user.rollNo,
            department: user.department,
            id: user.id,
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Google login failed:", error);
        setError("An error occurred during Google login. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      setError("Login failed. Please try again.");
    },
  });

  return (
    <div>
      <button
        onClick={googleLogin}
        className="w-full flex items-center justify-center bg-red-400 text-white p-2 rounded hover:bg-red-600 mt-2"
      >
        <FcGoogle className="text-xl mr-2" /> Log in with Google
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default GoogleLoginButton;

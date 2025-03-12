import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";
import GoogleLoginButton from "../loginComponents/GoogleLogin";
import nitcImage from "../assets/NIT-calicut-1024x576.webp";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const userData = response.data;
        loginUser({
          email: userData.email,
          firstName: userData.name,
          lastName: userData.lastName,
          role: userData.role,
          imageUrl: userData.imageUrl,
          batch: userData.batch,
          rollNo: userData.rollNo,
          department: userData.department,
          id: userData.id,
          profileType: userData.profileType,
        });

        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Login failed! Invalid email or password.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setResetMessage("Please enter a valid email.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/forgot-password",
        { email },
        { withCredentials: true }
      );
      setResetMessage(response.data);
    } catch (error) {
      setResetMessage("Error: Unable to send reset email.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${nitcImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>
      <div className="relative bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-96 max-w-lg border border-gray-200 z-10">
        {!isForgotPassword ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg text-lg font-bold shadow-md hover:scale-105 transition-transform duration-200"
              >
                Login
              </button>
            </form>
            <p
              className="mt-2 text-blue-600 cursor-pointer text-center hover:underline"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </p>

            <div className="mt-4 text-gray-500 text-center">OR</div>

            <div className="mt-4 flex justify-center">
              <GoogleLoginButton />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Reset Password
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              onClick={handleForgotPassword}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg text-lg font-bold shadow-md hover:scale-105 transition-transform duration-200 mt-5"
            >
              Send Reset Link
            </button>

            {resetMessage && (
              <p className="mt-4 text-center text-blue-600">{resetMessage}</p>
            )}
            <p
              className="mt-2 text-blue-600 cursor-pointer text-center hover:underline"
              onClick={() => setIsForgotPassword(false)}
            >
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;

// // Login.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useUser } from "../UserContext"; // Import the useUser hook
// import GoogleLoginButton from "../loginComponents/GoogleLogin";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();
//   const { loginUser } = useUser(); // Get the loginUser function from context
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [resetMessage, setResetMessage] = useState(""); // Message for forgot password


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(""); // Clear previous error message

//     try {
//       const response = await axios.post("http://localhost:8080/api/login", { email, password }, { withCredentials: true });

//       // Check if login is successful
//       if (response.status === 200) {
//         // Set the logged-in user in context
//         //console.log(response.data);
//         const userData = response.data;
//         //console.log(userData);
//         loginUser({
//           email: userData.email,
//           firstName: userData.name,
//           lastName: userData.lastName,
//           role: userData.role,
//           imageUrl: userData.imageUrl,
//           batch: userData.batch,
//           rollNo: userData.rollNo,
//           department: userData.department,
//           id:userData.id,
//           profileType:userData.profileType
//         });
//         console.log("from login",userData.profileType);
//         //console.log(user);
//         // Navigate to the appropriate dashboard
//         // if (userData.role === "ADMIN") {
//         //   navigate("/admin-dashboard");
//         // } else {
//         //   navigate("/alumni-dashboard");
//         // }
//         navigate("/");
//       }
//     } catch (error) {
//       // Display error message for invalid credentials
//       setErrorMessage("Login failed! Invalid email or password.");
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!email.trim()) {
//       setResetMessage("Please enter a valid email.");
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:8080/api/email/forgot-password", { email },{withCredentials:true
        
//       });
//       setResetMessage(response.data); // Success message from backend
//     } catch (error) {
//       setResetMessage("Error: Unable to send reset email.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       {!isForgotPassword ? (
//         // 🔹 **Login Form**
//         <div>
//           <h2 className="text-2xl mb-4">Login</h2>
//           <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full mb-4 p-2 border rounded"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full mb-4 p-2 border rounded"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//             <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Login</button>
//           </form>

//           {/* Forgot Password Toggle */}
//           <p className="mt-2 text-green-500 cursor-pointer" onClick={() => setIsForgotPassword(true)}>
//             Forgot Password?
//           </p>

//           {/* OR Divider */}
//           <div className="mt-4 text-gray-500">OR</div>

//           {/* Google Login Button */}
//           <GoogleLoginButton />
//         </div>
//       ) : (
//         // 🔹 **Forgot Password Form**
//         <div>
//           <h2 className="text-2xl mb-4">Forgot Password</h2>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full mb-4 p-2 border rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button onClick={handleForgotPassword} className="w-full bg-green-500 text-white p-2 rounded">
//             Send Reset Link
//           </button>
//           {resetMessage && <p className="mt-4 text-center">{resetMessage}</p>}

//           {/* Back to Login */}
//           <p className="mt-2 text-green-500 cursor-pointer" onClick={() => setIsForgotPassword(false)}>
//             Back to Login
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";
import { FcGoogle } from "react-icons/fc";
import alumniImage from "../assets/alumni.png"; // Ensure you have an image in the assets folder
import GoogleLoginButton from "../loginComponents/GoogleLogin";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:8080/api/login", { email, password }, { withCredentials: true });
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
      const response = await axios.post("http://localhost:8080/api/email/forgot-password", { email }, { withCredentials: true });
      setResetMessage(response.data);
    } catch (error) {
      setResetMessage("Error: Unable to send reset email.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side: Image */}
      <div className="w-1/2 flex items-center justify-center">
        <img src={alumniImage} alt="Alumni" className="w-3/4 h-auto rounded-lg shadow-lg" />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-1/2 flex flex-col items-center justify-center p-10">
        {!isForgotPassword ? (
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Login</button>
            </form>
            <p className="mt-2 text-green-500 cursor-pointer text-center" onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
            <div className="mt-4 text-gray-500 text-center">OR</div>

            {/* Google Login Button */}
            
            <GoogleLoginButton />
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mb-4 p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={handleForgotPassword} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Send Reset Link</button>
            {resetMessage && <p className="mt-4 text-center text-green-500">{resetMessage}</p>}
            <p className="mt-2 text-green-500 cursor-pointer text-center" onClick={() => setIsForgotPassword(false)}>Back to Login</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

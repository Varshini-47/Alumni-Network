import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import GoogleRegister from "../loginComponents/GoogleRegister";
import uploadToCloudinary from "../cloudinaryupload";
import nitcImage from "../assets/NIT-calicut-1024x576.webp";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaGraduationCap,
  FaIdBadge,
  FaUniversity,
} from "react-icons/fa";

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("ALUMNI");
  const [profileType, setProfileType] = useState("PUBLIC");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (!/^\d{4}$/.test(batch)) {
      alert("Batch must be a 4-digit year.");
      return;
    }

    setUploading(true);
    const uploadedImageUrl = await uploadToCloudinary(image);
    setUploading(false);

    const userData = {
      name,
      lastName,
      email,
      password,
      role,
      profileType,
      phone,
      batch,
      rollNo,
      department,
      imageUrl: uploadedImageUrl,
    };

    try {
      await axios.post("http://localhost:8080/api/register", userData, {
        withCredentials: true,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(
        error.response ? error.response.data : "Registration failed! Try again."
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${nitcImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>

      <div className="relative bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200 z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div className="relative w-1/2">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div className="relative w-1/2">
              <FaGraduationCap className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Batch (e.g., 2025)"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="relative w-1/2">
              <FaIdBadge className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Roll Number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="relative w-1/2">
              <FaUniversity className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          <input
            type="file"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleFileChange}
          />

          <div>
            <label className="block text-gray-700 font-semibold">
              Profile Type:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="PUBLIC"
                  checked={profileType === "PUBLIC"}
                  onChange={() => setProfileType("PUBLIC")}
                  className="mr-2"
                />
                Public
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="PRIVATE"
                  checked={profileType === "PRIVATE"}
                  onChange={() => setProfileType("PRIVATE")}
                  className="mr-2"
                />
                Private
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg text-lg font-bold shadow-md hover:scale-105 transition-transform duration-200"
          >
            {uploading ? "Uploading..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-gray-500 text-center">OR</div>

        <div className="flex flex-col items-center space-y-2 mt-4">
          <GoogleRegister />
        </div>
      </div>
    </div>
  );
}

export default Register;

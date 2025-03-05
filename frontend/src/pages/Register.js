import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import GoogleRegister from "../loginComponents/GoogleRegister";
import uploadToCloudinary from "../cloudinaryupload";
import loginImage from "../assets/alumni.png";

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

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone validation (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    // Batch validation (4-digit year)
    if (!/^\d{4}$/.test(batch)) {
      alert("Batch must be a 4-digit year.");
      return;
    }

    // Roll Number validation (1 letter, 6 digits, 2 letters)
    if (rollNo != "" && !/^[A-Za-z]\d{6}[A-Za-z]{2}$/.test(rollNo)) {
      alert(
        "Roll Number must be in the format: 1 letter, 6 digits, 2 letters."
      );
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
    <div className="flex items-center justify-center mt-100 mb-110 bg-gray-100 min-h-screen">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-3/4">
        {/* Left Side - Image */}
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={loginImage}
            alt="Alumni"
            className="w-3/4 h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Batch (e.g., 2025)"
              className="w-full p-2 border rounded"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Roll Number"
              className="w-full p-2 border rounded"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Department"
              className="w-full p-2 border rounded"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={handleFileChange}
            />

            {/* Profile Type Selection */}
            <div>
              <label className="block text-gray-700">Profile Type:</label>
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
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Register
            </button>
          </form>

          {/* OR Divider */}
          <div className="mt-4 text-gray-500 text-center">OR</div>

          {/* Google & LinkedIn Register Buttons */}
          <div className="flex flex-col items-center space-y-2 mt-4">
            <GoogleRegister />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

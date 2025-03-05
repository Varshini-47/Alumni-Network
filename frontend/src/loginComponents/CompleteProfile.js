import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadToCloudinary from "../cloudinaryupload";
import alumniImage from "../assets/alumni.png";

function CompleteProfile() {
  const [batch, setBatch] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [department, setDepartment] = useState("");
  const [uploading, setUploading] = useState(false);
  const [profileType, setProfileType] = useState("PUBLIC");
  const [user, setUser] = useState({ name: "", lastName: "", email: "" });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user-info", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user info:", error));
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[0-9]{4}$/.test(batch))
      return alert("Batch must be a 4-digit year.");
    if (!/^[0-9]{10}$/.test(phoneno))
      return alert("Phone number must be exactly 10 digits.");
    if (rollNo != "" && !/^[A-Za-z]\d{6}[A-Za-z]{2}$/.test(rollNo))
      return alert("Invalid Roll Number format.");

    setUploading(true);
    const uploadedImageUrl = await uploadToCloudinary(image);
    console.log(uploadedImageUrl);
    setUploading(false);

    if (uploadedImageUrl) {
      setImageUrl(uploadedImageUrl);
    }
    const completeUser = {
      firstName: user.name,
      lastName: user.lastName,
      email: user.email,
      batch,
      rollNo,
      phoneno,
      password,
      department,
      uploadedImageUrl,
      profileType,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/complete-profile",
        completeUser,
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error completing profile", error);
      alert("Failed to complete profile.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-100 mb-110 bg-gray-100 min-h-screen">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-3/4">
        {/* Left Section - Image */}
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={alumniImage}
            alt="Alumni"
            className="w-3/4 h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Complete your profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={user.name}
              className="w-full p-2 border rounded"
              readOnly
            />
            <input
              type="text"
              value={user.lastName}
              className="w-full p-2 border rounded"
              readOnly
            />
            <input
              type="email"
              value={user.email}
              className="w-full p-2 border rounded"
              readOnly
            />
            <input
              type="text"
              placeholder="Batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Phone No"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={profileType}
              onChange={(e) => setProfileType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            >
              {uploading ? "Uploading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;

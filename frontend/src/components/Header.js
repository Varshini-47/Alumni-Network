import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import axios from "axios";
import nitcLogo from "../assets/nitclogo.jpeg";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Header() {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchType, setSearchType] = useState("Name");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/logout",
        {},
        { withCredentials: true }
      );
      logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }

    const searchParams = new URLSearchParams({
      type: searchType.toLowerCase().replace(" ", "_"),
      query: searchQuery,
    });

    navigate(`/search?${searchParams.toString()}`);

    setSearchQuery("");
  };

  const isProfilePage = user && location.pathname === `/profile/${user.id}`;

  return (
    <nav className="bg-blue-200 shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={nitcLogo} alt="NITC Logo" className="h-10 w-10" />
          <Link to="/" className="text-xl font-bold text-blue-700">
            ALUMNI ASSOCIATION
          </Link>
        </div>

        <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 bg-gray-100 shadow-md">
          <select
            className="bg-transparent text-gray-700 text-sm font-medium focus:outline-none cursor-pointer"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="Name">Name</option>
            <option value="Batch">Batch</option>
            <option value="Company Name">Company Name</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchType}`}
            className="ml-2 px-3 py-1 bg-transparent focus:outline-none w-40 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-600 text-white px-4 py-1.5 rounded-full shadow-md hover:bg-blue-700 transition flex items-center"
          >
            <FaSearch className="mr-1" />
            Search
          </button>
        </div>

        <div className="flex items-center space-x-6 text-gray-600">
          <Link to="/about" className="hover:text-blue-700 transition">
            About Us
          </Link>
          <Link to="/alumni" className="hover:text-blue-700 transition">
            Featured Alumni
          </Link>
          <Link to="/events" className="hover:text-blue-700 transition">
            Events
          </Link>
          <Link to="/gallery" className="hover:text-blue-700 transition">
            Gallery
          </Link>
          <Link to="/contact" className="hover:text-blue-700 transition">
            Contact
          </Link>

          {!user || !user.firstName ? (
            <div className="space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-blue-700 border border-blue-700 rounded-md shadow hover:bg-blue-700 hover:text-white transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-700 text-white rounded-md shadow hover:bg-blue-800 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {!isProfilePage && (
                <img
                  src={user.imageUrl}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
              >
                Logout
              </button>
              {!isProfilePage && user.role === "ALUMNI" && (
                <Link
                  to={`/profile/${user.id}`}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md shadow hover:bg-blue-800 transition"
                >
                  View Profile
                </Link>
              )}
              {user.role === "ADMIN" && (
                <Link
                  to="/admin-dashboard"
                  className="px-4 py-2 bg-blue-700 text-white rounded-md shadow hover:bg-blue-800 transition"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;

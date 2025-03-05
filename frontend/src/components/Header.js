import { Link } from "react-router-dom";
import { useUser } from "../UserContext";
import axios from "axios";
import nitcLogo from "../assets/nitclogo.jpeg";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logoutUser } = useUser();

  const navigate = useNavigate();

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
  return (
    <nav className="bg-pink-100 py-6 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={nitcLogo} alt="NITC Logo" className="h-12 w-12" />

          <Link to="/" className="text-xl font-semibold cursor-pointer">
            ALUMNI ASSOCIATION
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/about" className="hover:text-green-600">
            ABOUT US
          </Link>
          <Link to="/alumni" className="hover:text-green-600">
            FEATURED ALUMNI
          </Link>
          <Link to="/events" className="hover:text-green-600">
            EVENTS
          </Link>
          <Link to="/gallery" className="hover:text-green-600">
            GALLERY
          </Link>
          <Link to="/contact" className="hover:text-green-600">
            CONTACT US
          </Link>
          {!(user && user.firstName) ? (
            <div className="space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-green-500 border border-green-500 rounded"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Register
              </Link>
            </div>
          ) : (
            <div>
              <img
                src={user.imageUrl}
                alt="User Profile"
                className="h-10 w-10  rounded-full object-cover ml-12"
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
              {(user.role === "ALUMNI")?(
              <Link
                to={`/profile/${user.id}`}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                View Profile
              </Link>
              ):(
              <Link
                to={"/admin-dashboard"}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Admin Dashboard
              </Link>
              )}
              <div>
                <button className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg">
                  Invite Peers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Header;

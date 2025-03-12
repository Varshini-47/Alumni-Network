import { Link } from "react-router-dom";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import nitcImage from "../assets/nitc_enhanced.png";
import achievement from "../assets/achievement.png";
import job from "../assets/job.png";
import leaderboard from "../assets/leaderboard.png";

import "../index.css";

function Home() {
  const { user, logoutUser } = useUser();
  const [alumni, setAlumni] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlumni();
    fetchEvents();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users", {
        withCredentials: true,
      });
      setAlumni(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events", {
        withCredentials: true,
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const monthAbbr = monthNames[parseInt(month, 10) - 1];
    return { day, monthAbbr };
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="relative h-[500px]">
        <img
          src={nitcImage}
          alt="NITC Campus"
          className="w-full h-full object-cover object-bottom shadow-lg"
        />
      </div>

      <div className="mt-10 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-40 max-w-5xl">
        <div className="group relative flex flex-col items-center w-[250px] shadow-lg rounded-lg overflow-hidden bg-white transform transition duration-300 hover:scale-105">
          <img
            src={achievement}
            alt="Achievements"
            className="w-full h-40 object-cover"
          />
          <div className="bg-gray-300 w-full py-4 flex justify-center group-hover:bg-blue-600 transition">
            <Link
              to={"/achievements"}
              className="text-xl font-semibold text-center text-gray-800 group-hover:text-white"
            >
              Achievements
            </Link>
          </div>
        </div>

        <div className="group relative flex flex-col items-center w-[250px] shadow-lg rounded-lg overflow-hidden bg-white transform transition duration-300 hover:scale-105">
          <img src={job} alt="Jobs" className="w-full h-40 object-cover" />
          <div className="bg-gray-300 w-full py-4 flex justify-center group-hover:bg-green-600 transition">
            <Link
              to={"/job-opportunities"}
              className="text-xl font-semibold text-center text-gray-800 group-hover:text-white"
            >
              Job Opportunities
            </Link>
          </div>
        </div>

        <div className="group relative flex flex-col items-center w-[250px] shadow-lg rounded-lg overflow-hidden bg-white transform transition duration-300 hover:scale-105">
          <img
            src={leaderboard}
            alt="Leaderboard"
            className="w-full h-40 object-cover"
          />
          <div className="bg-gray-300 w-full py-4 flex justify-center group-hover:bg-purple-600 transition">
            <Link
              to={"/leaderboard"}
              className="text-xl font-semibold text-center text-gray-800 group-hover:text-white"
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-800 transition transform hover:scale-105">
        Invite Peers
      </button>

      <div className="container mx-auto px-20 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl">
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Latest Members
          </h3>
          <div className="flex flex-col space-y-4">
            {alumni.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-200 transition"
                onClick={() => navigate(`/profile/${member.id}`)}
              >
                <img
                  src={member.imageUrl || "https://via.placeholder.com/100"}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h4>
                  <p className="text-gray-600">{member.batch}</p>
                  <p className="text-gray-500">{member.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Events</h3>
          <div className="space-y-4">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-4 bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition"
              >
                <div className="bg-white p-2 rounded-lg shadow-md text-center w-16">
                  <div className="text-sm text-gray-700 font-semibold">
                    {formatDate(event.date).monthAbbr}
                  </div>
                  <div className="text-2xl font-bold text-blue-700">
                    {formatDate(event.date).day}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {event.eventName}
                  </h4>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

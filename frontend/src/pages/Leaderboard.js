import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/users/leaderboard", { withCredentials: true })
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching leaderboard:", error));
  }, []);

  // Function to determine medal type based on points
  const getMedal = (points) => {
    if (points >= 500) return { name: "Diamond 🏆", color: "text-purple-700 font-bold" };
    if (points >= 200) return { name: "Platinum 🥈", color: "text-gray-700 font-semibold" };
    if (points >= 100) return { name: "Gold 🥇", color: "text-yellow-600 font-semibold" };
    if (points >= 50) return { name: "Silver 🥈", color: "text-gray-500 font-semibold" };
    return { name: "Bronze 🥉", color: "text-orange-600 font-semibold" };
  };

  return (
    <div className=" min-h-screen container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">🎓 Alumni Leaderboard</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-4 text-left">Picture</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Batch</th>
              <th className="p-4 text-left">Points</th>
              <th className="p-4 text-left">Medal 🏅</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => user.role === "ALUMNI") // Filter first for efficiency
              .map((user, index) => {
                const { name, color } = getMedal(user.points);
                return (
                  <tr 
                    key={index} 
                    onClick={() => navigate(`/profile/${user.id}`)} // Clickable row
                    className="cursor-pointer border-b transition duration-300 hover:bg-gray-100"
                  >
                    <td className="p-4">
                      <img 
                        src={user.imageUrl} 
                        alt={user.name} 
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-300" 
                      />
                    </td>
                    <td className="p-4 text-gray-800 font-semibold">{user.name}</td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4 text-gray-500">{user.batch}</td>
                    <td className="p-4 text-blue-600 font-bold">{user.points} Points</td>
                    <td className={`p-4 ${color}`}>{name}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>

    
    </div>
  );
}

export default Leaderboard;

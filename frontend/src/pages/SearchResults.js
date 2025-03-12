import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const user = useUser();
  console.log(user.user);
  const id = user.user.id;
  console.log(user.user.id);
  const searchType = searchParams.get("type");
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/search?type=${searchType}&query=${searchQuery}`
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchUsers();
  }, [searchType, searchQuery]);

  return (
    <div className="p-4 min-h-[calc(100vh-180px)]">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for "{searchQuery}"
      </h1>
      {users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users
            .filter((user) => user.id !== id)
            .map((user) => (
              <div
                key={user.id}
                className="cursor-pointer border rounded-2xl p-4 shadow-md flex items-center space-x-4 hover:shadow-lg transition"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                <img
                  src={user.imageUrl || "https://via.placeholder.com/150"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-gray-600">{user.batch}</p>
                  <p className="text-gray-500">{user.department}</p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;

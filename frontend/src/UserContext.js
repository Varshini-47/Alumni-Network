import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}`
      );
      setUser((prevUser) => ({
        ...prevUser,
        ...response.data,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, loginUser, logoutUser, fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}

// import React, { createContext, useState, useContext, useEffect } from "react";

// const UserContext = createContext();

// export function useUser() {
//   return useContext(UserContext);
// }

// export function UserProvider({ children }) {
//   // Load user from localStorage when the app starts
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Function to log in user and save to localStorage
//   const loginUser = (userData) => {
//     setUser(userData);  
//     localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
//   };

//   // Function to log out user and clear localStorage
//   const logoutUser = () => {
//     setUser(null);
//     localStorage.removeItem("user"); // Remove user data
//   };

//   return (
//     <UserContext.Provider value={{ user, loginUser, logoutUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }


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

  // Fetch updated user data from backend
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
      setUser((prevUser) => ({
        ...prevUser, // Keep existing properties
        ...response.data, // Update with new data
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

  // Sync user state with localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
}


// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";

// const UserContext = createContext();

// export function useUser() {
//   return useContext(UserContext);
// }

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Fetch updated user data from backend
//   const fetchUserData = async (userId) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
//       setUser(response.data);
//       localStorage.setItem("user", JSON.stringify(response.data)); // Persist updated user
      
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const loginUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logoutUser = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <UserContext.Provider value={{ user, loginUser, logoutUser, fetchUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

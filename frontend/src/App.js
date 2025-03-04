// import axios from "axios";
// import { useEffect, useState } from "react";

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/hello")
//       .then(response => setMessage(response.data))
//       .catch(error => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div>
//       <h1 style={{color:'red'}}>{message}</h1>
//     </div>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GoogleRegister from "./loginComponents/GoogleRegister";
import CompleteProfile from "./loginComponents/CompleteProfile";
import './index.css';
import './App.css';
import Home from "./pages/Home";
import LinkedinRegister from "./loginComponents/LinkedinRegister";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ResetPassword from "./ResetPassword";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google-register" element={<GoogleRegister />} />
        <Route path="/linkedin-register" element={<LinkedinRegister />} />
       
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/complete-profile" element={<CompleteProfile/>}/>
      
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    
   
  );
}

export default App;


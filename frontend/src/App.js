import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GoogleRegister from "./loginComponents/GoogleRegister";
import CompleteProfile from "./loginComponents/CompleteProfile";
import "./index.css";
import "./App.css";
import Home from "./pages/Home";
import LinkedinRegister from "./loginComponents/LinkedinRegister";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ResetPassword from "./ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import AchievementsList from "./pages/Achievements";
import AchievementsForm from "./pages/AddAchievements";
import AddWorkExperience from "./pages/AddWorkExperience";
import WorkExperienceList from "./pages/WorkExperience";
import AlumniWorkExp from "./pages/AlumniWorkExp";
import AlumniAchievements from "./pages/AlumniAchievements";
import JobOpportunities from "./pages/JobOpportunities";
import AlumniList from "./pages/Alumni";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";

import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/google-register" element={<GoogleRegister />} />
      <Route path="/linkedin-register" element={<LinkedinRegister />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/add-work-experience" element={<AddWorkExperience />} />
      <Route path="/add-achievements" element={<AchievementsForm />} />
      <Route path="/job-opportunities" element={<JobOpportunities />} />
      <Route path="/achievements" element={<AchievementsList />} />
      <Route
        path="/alumni/:alumniId/achievements"
        element={<AlumniAchievements />}
      />
      <Route
        path="/alumni/:alumniId/workexperience"
        element={<AlumniWorkExp />}
      />
      {/* <Route path="/admin-dashboard" element={<Dashboard />} /> */}
      <Route path="/achievements" element={<AchievementsList />} />
      <Route path="/alumni" element={<AlumniList />} />
      <Route path="/work-experience" element={<WorkExperienceList />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/events" element={<Events />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}

export default App;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import { FaTrash, FaBuilding, FaMapMarkerAlt, FaBriefcase, FaUserTie, FaTools, FaFileAlt, FaCalendar, FaLink, FaEnvelope, FaPlus, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import nitc from "../assets/NIT-calicut-1024x576.webp";

function JobOpportunities() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    skills: "",
    description: "",
    applicationDeadline: "",
    applicationLink: "",
    contactInfo: "",
  });

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/jobs", { withCredentials: true });
      const jobOppurtunitiesArray = Array.isArray(response.data) ? response.data.reverse() : [response.data];
      setJobs(jobOppurtunitiesArray);
      // setJobs(response.data);
    } catch (error) {
      console.error("Error fetching job opportunities", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.userId=user.id;
      await axios.post("http://localhost:8080/api/jobs", formData, { withCredentials: true });
      alert("Job posted successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        skills: "",
        description: "",
        applicationDeadline: "",
        applicationLink: "",
        contactInfo: "",
        userId:"",
      });
      setShowForm(false);
      fetchJobs();
    } catch (error) {
      console.error("Error posting job", error);
      alert("Failed to post job");
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/jobs/${jobId}`, { withCredentials: true });
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <div className="text-center">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center">
           Job Oppurtunities
        </h2>
      </div>



      {user && user.firstName && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-10"
        >
          {showForm ? "Close Form" : "Post Job"}
        </button>
      )}

      {showForm && user && user.firstName && (
        <div className="relative min-h-screen flex justify-center items-center bg-gray-100">
          {/* Blurred Background Image */}
          {/* <div className="absolute inset-0 bg-cover bg-center filter blur-sm" style={{ backgroundImage: `url(${nitc})` }}></div> */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${nitc})`, filter: "blur(2px)" }}></div>
          {/* Form Container */}
          <div className="relative bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-3xl border border-gray-300">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center">
              Post a Job
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-3 text-blue-500" />
                <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} className="w-full pl-10 p-2 border rounded hover:shadow-md transition" required />
              </div>

              {/* Company Name */}
              <div className="relative">
                <FaBuilding className="absolute left-3 top-3 text-green-500" />
                <input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} className="w-full pl-10 p-2 border rounded hover:shadow-md transition" required />
              </div>

              {/* Location */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-red-500" />
                <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full pl-10 p-2 border rounded hover:shadow-md transition" required />
              </div>

              {/* Job Type */}
              <div className="relative">
                <FaClock className="absolute left-3 top-3 text-purple-500" />
                <input name="jobType" placeholder="Job Type" value={formData.jobType} onChange={handleChange} className="w-full pl-10 p-2 border rounded hover:shadow-md transition" required />
              </div>

              {/* Experience Level */}
              <div className="relative">
                <FaUserTie className="absolute left-3 top-3 text-yellow-500" />
                <input name="experienceLevel" placeholder="Experience Level" value={formData.experienceLevel} onChange={handleChange} className="w-full pl-10 p-2 border rounded hover:shadow-md transition" required />
              </div>

              {/* Skills Required */}
              <div className="relative">
                <FaTools className="absolute left-3 top-3 text-indigo-500" />
                <input name="skills" placeholder="Skills Required" value={formData.skills} onChange={handleChange} className="w-full pl-10 p-2 border rounded hover:shadow-md transition" required />
              </div>

              {/* Application Deadline */}
              <div className="relative">
                <FaCalendar className="absolute left-3 top-3 text-teal-500" />
                <input name="applicationDeadline" type="date" value={formData.applicationDeadline} onChange={handleChange} className="w-full pl-10 p-2 border rounded hover:shadow-md transition" required />
              </div>

              {/* Application Link */}
              <div className="relative">
                <FaLink className="absolute left-3 top-3 text-gray-500" />
                <input name="applicationLink" placeholder="Application Link" value={formData.applicationLink} onChange={handleChange} className="w-full pl-10 p-2 border rounded hover:shadow-md transition" required />
              </div>

              {/* Contact Info */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-yellow-500" />
                <input name="contactInfo" placeholder="Contact Info" value={formData.contactInfo} onChange={handleChange} className="w-full pl-10 p-2 border rounded hover:shadow-md transition" required />
              </div>

              {/* Job Description (Full Width) */}
              <div className="relative col-span-2">
                <FaFileAlt className="absolute left-3 top-3 text-gray-500" />
                <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} className="w-full pl-10 p-2 border rounded hover:shadow-md transition h-28" required />
              </div>

              {/* Submit Button (Full Width) */}
              <div className="col-span-2">
                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition shadow-md">
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Job Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
               <div className="
               flex justify-between">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                {job.title}
              </h3>
              {user && user.role === "admin" && (
                  // <button onClick={() => handleDelete(job.id)} className="text-red-500 hover:text-red-700">
                  //   <FaTrash size={20} />
                  // </button>

<button
onClick={() =>  handleDelete(job.id)}
className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
>
<FaTrash size={16} />
</button>

                )}
                </div>
              <p className="text-gray-600 flex items-center">
                <FaBuilding className="text-green-500 mr-2" /> {job.company}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-2" /> {job.location}
              </p>
              <p className="text-gray-500 flex items-center">
                <FaUserTie className="text-yellow-500 mr-2" /> {job.experienceLevel}
              </p>
              <p className="text-gray-500 flex items-center">
                <FaTools className="text-indigo-500 mr-2" /> {job.skills}
              </p>
              <p className="mt-2 text-sm text-gray-700">{job.description}</p>
              <p className="text-gray-500 flex items-center">
                <FaClock className="text-purple-500 mr-2" /> Deadline: {  new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <a href={job.applicationLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  🔗 Apply Now
                </a>
               
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No job opportunities posted yet.</p>
        )}
      </div>
    </div>
  );
}

export default JobOpportunities;

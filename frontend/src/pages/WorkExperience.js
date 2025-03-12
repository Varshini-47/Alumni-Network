import { useState, useEffect } from "react";
import axios from "axios";

const WorkExperienceList = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkExperiences();
  }, []);

  const fetchWorkExperiences = () => {
    axios
      .get("http://localhost:8080/api/work-experience", {
        withCredentials: true,
      })
      .then((response) => {
        setWorkExperiences(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch work experiences");
        setLoading(false);
      });
  };

  const deleteWorkExperience = (id) => {
    axios
      .delete(`http://localhost:8080/api/work-experience/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setWorkExperiences(workExperiences.filter((exp) => exp.id !== id));
      })
      .catch(() => {
        alert("Failed to delete work experience.");
      });
  };

  if (loading)
    return (
      <div className="flex justify-center mt-10 text-gray-500">Loading...</div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Alumni Work Experiences
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workExperiences.map((exp) => (
              <tr key={exp.id} className="border-b hover:bg-gray-50">
                <td className="border p-2">{exp.user.name}</td>
                <td className="border p-2">{exp.company}</td>
                <td className="border p-2">{exp.role}</td>
                <td className="border p-2">{exp.location}</td>
                <td className="border p-2">{exp.startDate}</td>
                <td className="border p-2">{exp.endDate || "Present"}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => deleteWorkExperience(exp.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkExperienceList;

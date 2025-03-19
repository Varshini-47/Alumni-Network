
import { useState, useEffect } from "react";
import axios from "axios";
import { FaBuilding, FaUserTie, FaMapMarkerAlt, FaCalendarAlt, FaTrash } from "react-icons/fa";

const WorkExperienceList = () => {
    const [workExperiences, setWorkExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWorkExperiences();
    }, []);

    const fetchWorkExperiences = () => {
        axios.get("http://localhost:8080/api/work-experience", { withCredentials: true })
            .then(response => {
                setWorkExperiences(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch work experiences");
                setLoading(false);
            });
    };

    const deleteWorkExperience = (id) => {
        axios.delete(`http://localhost:8080/api/work-experience/${id}`, { withCredentials: true })
            .then(() => {
                setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
            })
            .catch(() => {
                alert("Failed to delete work experience.");
            });
    };

    if (loading) return <div className="text-center text-gray-600 mt-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Alumni Work Experiences</h2>

            {workExperiences.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workExperiences.map((work) => (
                        <div key={work.id} className="bg-white p-5 rounded-xl shadow-lg relative transition-all hover:shadow-2xl">
                            <h3 className="text-2xl font-semibold flex items-center gap-2 text-gray-900">
                                <FaBuilding className="text-blue-600" /> {work.company}
                            </h3>
                            <p className="text-gray-600 flex items-center gap-2">
                                <FaUserTie className="text-green-600" /> {work.role}
                            </p>
                            <p className="text-gray-500 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-500" /> {work.location}
                            </p>
                            <p className="text-gray-500 flex items-center gap-2">
                                <FaCalendarAlt className="text-yellow-500" /> {new Date(work.startDate).toLocaleDateString()} - 
                                {work.present ? "Present" : new Date(work.endDate).toLocaleDateString()}
                            </p>
                            <p className="mt-3 text-gray-700">{work.description}</p>

                            {/* Delete Button */}
                            <button
                                onClick={() => deleteWorkExperience(work.id)}
                                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
                            >
                                <FaTrash size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center mt-6">No work experience added yet.</p>
            )}
        </div>
    );
};

export default WorkExperienceList;

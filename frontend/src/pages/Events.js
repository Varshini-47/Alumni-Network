// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "../UserContext"; // Assuming UserContext provides logged-in user info
// import nitc from "../assets/NIT-calicut-1024x576.webp";

// function Events() {
//     const { user } = useUser(); // Get logged-in user  
//     // Form state
//     const [formData, setFormData] = useState({
//         eventName: "",
//         description: "",
//         eventType: "",
//         organizer: "",
//         date: "",
//         venue: "",
//         contactPersonEmail: "",
//         sponsorshipDetails: "",
//     });



//     // State for storing posted jobs
//     const [events, setEvents] = useState([]);

//     // State to toggle form visibility
//     const [showForm, setShowForm] = useState(false);

//     // Handle form input changes
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8080/api/events", formData, { withCredentials: true });
//             alert("Event posted successfully!");
//             setFormData({
//                 eventName: "",
//                 description: "",
//                 eventType: "",
//                 organizer: "",
//                 date: "",
//                 venue: "",
//                 contactPersonEmail: "",
//                 sponsorshipDetails: "",
//             });
//             setShowForm(false); // Hide form after submission
//             fetchEvents(); // Refresh jobs list after posting
//         } catch (error) {
//             console.error("Error posting event", error);
//             alert("Failed to post event");
//         }
//     };

//     // Fetch all job opportunities
//     const fetchEvents = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/events", { withCredentials: true });
//             setEvents(response.data);
//             console.log(events);
//         } catch (error) {
//             console.error("Error fetching events", error);
//         }
//     };

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-100 p-6 relative">
//             {/* <h1 className="text-2xl font-bold mb-4">Job Opportunities</h1> */}

//             {/* Floating button to post job opportunity - only if logged in */}
//             {user && user.firstName && (
//                 <button
//                     onClick={() => setShowForm(!showForm)}
//                     className="fixed bottom-4 left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-10"
//                 >
//                     {showForm ? "Close Form" : "Post Event"}
//                 </button>
//             )}


//             {showForm && user && user.firstName && (
//                 <div
//                 className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
//                 style={{ backgroundImage: `url(${nitc})`  }}
//               >
//                 {/* Overlay for blur effect */}
//                 <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>

//                 {/* Form Container */}
//                 <div className="relative bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-300">
//                   <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center">
//                      Add Event
//                   </h2>

//                   <form onSubmit={handleSubmit} className="space-y-5">

//                         {/* Form Grid Layout */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input
//                                 name="eventName"
//                                 placeholder="Event Name"
//                                 value={formData.eventName}
//                                 onChange={handleChange}
//                                 className="p-2 border rounded"
//                                 required
//                             />
//                             <input
//                                 name="eventType"
//                                 placeholder="Event Type (e.g., Webinar, Reunion)"
//                                 value={formData.eventType}
//                                 onChange={handleChange}
//                                 className="p-2 border rounded"
//                                 required
//                             />
//                             <input
//                                 name="organizer"
//                                 placeholder="organizer"
//                                 value={formData.organizer}
//                                 onChange={handleChange}
//                                 className="p-2 border rounded"
//                                 required
//                             />
//                             <input
//                                 name="date"
//                                 type="date"
//                                 value={formData.date}
//                                 onChange={handleChange}
//                                 className="p-2 border rounded"
//                                 required
//                             />
//                             <input
//                                 name="venue"
//                                 placeholder="Venue (or Meeting Link for Online Events)"
//                                 value={formData.venue}
//                                 onChange={handleChange}
//                                 className="p-2 border rounded"
//                                 required
//                             />
//                             <input
//                                 name="contactPersonEmail"
//                                 type="email"
//                                 placeholder="Contact Person Email"
//                                 value={formData.contactPersonEmail}
//                                 onChange={handleChange}
//                                 className="p-2 border rounded"
//                                 required
//                             />
//                         </div>

//                         {/* Full-width Textareas */}
//                         <textarea
//                             name="description"
//                             placeholder="Event Description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             className="w-full p-2 border rounded mt-4"
//                             required
//                         />
//                         <textarea
//                             name="sponsorshipDetails"
//                             placeholder="Sponsorship Details (Optional)"
//                             value={formData.sponsorshipDetails}
//                             onChange={handleChange}
//                             className="w-full p-2 border rounded mt-4"
//                         />

//                         {/* Submit Button */}
//                         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
//                             Post Event
//                         </button>
//                     </form>
//                     </div>
//                 </div>
//             )}
//             <h2 className="text-2xl font-bold mt-8">Events</h2>
//             <div className="mt-4">
//                 {events.length > 0 ? (
//                     events.map((event) => (
//                         <div key={event.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
//                             <h3 className="text-xl font-semibold">{event.eventName}</h3>
//                             <p className="text-gray-600">Organized by: {event.organizer}</p>
//                             <p className="text-gray-500">Type: {event.eventType}</p>
//                             <p className="text-gray-500">date: {event.date}</p>
//                             <p className="text-gray-500">venue: {event.venue}</p>
//                             <p className="mt-2">{event.description}</p>
//                             {event.sponsorshipDetails && (
//                                 <p className="text-sm text-gray-500">Sponsorship Details: {event.sponsorshipDetails}</p>
//                             )}
//                             <p className="text-sm text-gray-500 mt-1">Contact: {event.contactPersonEmail}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No Events posted yet.</p>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default Events;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "../UserContext"; // Assuming UserContext provides logged-in user info
// import nitc from "../assets/NIT-calicut-1024x576.webp";

// function Events() {
//     const { user } = useUser(); // Get logged-in user  
//     // Form state
//     const [formData, setFormData] = useState({
//         eventName: "",
//         description: "",
//         eventType: "",
//         organizer: "",
//         date: "",
//         venue: "",
//         contactPersonEmail: "",
//         sponsorshipDetails: "",
//     });



//     // State for storing posted jobs
//     const [events, setEvents] = useState([]);

//     // State to toggle form visibility
//     const [showForm, setShowForm] = useState(false);

//     // Handle form input changes
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8080/api/events", formData, { withCredentials: true });
//             alert("Event posted successfully!");
//             setFormData({
//                 eventName: "",
//                 description: "",
//                 eventType: "",
//                 organizer: "",
//                 date: "",
//                 venue: "",
//                 contactPersonEmail: "",
//                 sponsorshipDetails: "",
//             });
//             setShowForm(false); // Hide form after submission
//             fetchEvents(); // Refresh jobs list after posting
//         } catch (error) {
//             console.error("Error posting event", error);
//             alert("Failed to post event");
//         }
//     };

//     // Fetch all job opportunities
//     const fetchEvents = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/events", { withCredentials: true });
//             setEvents(response.data);
//             console.log(events);
//         } catch (error) {
//             console.error("Error fetching events", error);
//         }
//     };

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-100 p-6 relative">


//             <h2 className="text-2xl font-bold mt-8">Events</h2>
//             <div className="mt-4">
//                 {events.length > 0 ? (
//                     events.map((event) => (
//                         <div key={event.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
//                             <h3 className="text-xl font-semibold">{event.eventName}</h3>
//                             <p className="text-gray-600">Organized by: {event.organizer}</p>
//                             <p className="text-gray-500">Type: {event.eventType}</p>
//                             <p className="text-gray-500">date: {event.date}</p>
//                             <p className="text-gray-500">venue: {event.venue}</p>
//                             <p className="mt-2">{event.description}</p>
//                             {event.sponsorshipDetails && (
//                                 <p className="text-sm text-gray-500">Sponsorship Details: {event.sponsorshipDetails}</p>
//                             )}
//                             <p className="text-sm text-gray-500 mt-1">Contact: {event.contactPersonEmail}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No Events posted yet.</p>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default Events;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import nitc from "../assets/NIT-calicut-1024x576.webp";
import { AiOutlinePlus, AiOutlineClose, AiOutlineCalendar, AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { FaLocationArrow, FaRegFileAlt, FaMicrophone } from "react-icons/fa";

function Events() {
    const { user } = useUser();

    // Form state
    const [formData, setFormData] = useState({
        eventName: "",
        description: "",
        eventType: "",
        organizer: "",
        date: "",
        venue: "",
        contactPersonEmail: "",
        sponsorshipDetails: "",
    });

    // State for storing events
    const [events, setEvents] = useState([]);

    // State to toggle form visibility
    const [showForm, setShowForm] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/events", formData, { withCredentials: true });
            alert("Event posted successfully!");
            setFormData({
                eventName: "",
                description: "",
                eventType: "",
                organizer: "",
                date: "",
                venue: "",
                contactPersonEmail: "",
                sponsorshipDetails: "",
            });
            setShowForm(false);
            fetchEvents();
        } catch (error) {
            console.error("Error posting event", error);
            alert("Failed to post event");
        }
    };

    // Fetch all events
    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/events", { withCredentials: true });
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // return (
    //         <div className="min-h-screen bg-gray-50 p-6">
    //             {/* Header Section */}
    //             <div className="flex justify-between items-center mb-6">
    //                 <h2 className="text-4xl font-bold text-black">Upcoming Events</h2>
    //                 {user && (
    //                     <button 
    //                         className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-500 transition"
    //                         onClick={() => setShowForm(true)}
    //                     >
    //                         <AiOutlinePlus size={20} /> Add Event
    //                     </button>
    //                 )}

    // {showForm && user && user.firstName && (
    //                 <div
    //                 className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    //                 style={{ backgroundImage: `url(${nitc})`  }}
    //               >
    //                 {/* Overlay for blur effect */}
    //                 <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>

    //                 {/* Form Container */}
    //                 <div className="relative bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-300">
    //                   <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center">
    //                      Add Event
    //                   </h2>

    //                   <form onSubmit={handleSubmit} className="space-y-5">

    //                         {/* Form Grid Layout */}
    //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                             <input
    //                                 name="eventName"
    //                                 placeholder="Event Name"
    //                                 value={formData.eventName}
    //                                 onChange={handleChange}
    //                                 className="p-2 border rounded"
    //                                 required
    //                             />
    //                             <input
    //                                 name="eventType"
    //                                 placeholder="Event Type (e.g., Webinar, Reunion)"
    //                                 value={formData.eventType}
    //                                 onChange={handleChange}
    //                                 className="p-2 border rounded"
    //                                 required
    //                             />
    //                             <input
    //                                 name="organizer"
    //                                 placeholder="organizer"
    //                                 value={formData.organizer}
    //                                 onChange={handleChange}
    //                                 className="p-2 border rounded"
    //                                 required
    //                             />
    //                             <input
    //                                 name="date"
    //                                 type="date"
    //                                 value={formData.date}
    //                                 onChange={handleChange}
    //                                 className="p-2 border rounded"
    //                                 required
    //                             />
    //                             <input
    //                                 name="venue"
    //                                 placeholder="Venue (or Meeting Link for Online Events)"
    //                                 value={formData.venue}
    //                                 onChange={handleChange}
    //                                 className="p-2 border rounded"
    //                                 required
    //                             />
    //                             <input
    //                                 name="contactPersonEmail"
    //                                 type="email"
    //                                 placeholder="Contact Person Email"
    //                                 value={formData.contactPersonEmail}
    //                                 onChange={handleChange}
    //                                 className="p-2 border rounded"
    //                                 required
    //                             />
    //                         </div>

    //                         {/* Full-width Textareas */}
    //                         <textarea
    //                             name="description"
    //                             placeholder="Event Description"
    //                             value={formData.description}
    //                             onChange={handleChange}
    //                             className="w-full p-2 border rounded mt-4"
    //                             required
    //                         />
    //                         <textarea
    //                             name="sponsorshipDetails"
    //                             placeholder="Sponsorship Details (Optional)"
    //                             value={formData.sponsorshipDetails}
    //                             onChange={handleChange}
    //                             className="w-full p-2 border rounded mt-4"
    //                         />

    //                         {/* Submit Button */}
    //                         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
    //                             Post Event
    //                         </button>
    //                     </form>
    //                     </div>
    //                 </div>
    //             )}
    //         </div>
    //             </div>

    //             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    //                 {events.length > 0 ? (
    //                     events.map((event) => (
    //                         <div 
    //                             key={event.id} 
    //                             className="bg-white p-5 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl"
    //                         >
    //                             <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
    //                                 <FaRegFileAlt /> {event.eventName}
    //                             </h3>
    //                             <p className="text-gray-600 flex items-center gap-2"> 
    //                                 <AiOutlineUser /> <strong>Organizer:</strong> {event.organizer}
    //                             </p>
    //                             <p className="text-gray-500 flex items-center gap-2"> 
    //                                 <FaMicrophone /> <strong>Type:</strong> {event.eventType}
    //                             </p>
    //                             <p className="text-gray-500 flex items-center gap-2"> 
    //                                 <AiOutlineCalendar /> <strong>Date:</strong> {event.date}
    //                             </p>
    //                             <p className="text-gray-500 flex items-center gap-2"> 
    //                                 <FaLocationArrow /> <strong>Venue:</strong> {event.venue}
    //                             </p>
    //                             <p className="mt-3">{event.description}</p>
    //                             {event.sponsorshipDetails && (
    //                                 <p className="text-sm text-gray-500">💰 <strong>Sponsorship:</strong> {event.sponsorshipDetails}</p>
    //                             )}
    //                             <p className="text-sm text-gray-500 mt-2 flex items-center gap-2"> 
    //                                 <AiOutlineMail /> <strong>Contact:</strong> {event.contactPersonEmail}
    //                             </p>
    //                         </div>
    //                     ))
    //                 ) : (
    //                     <p className="text-gray-600 text-lg">No events posted yet. Be the first to add one!</p>
    //                 )}
    //             </div>



    // };

    // export default Events;
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header Section */}

            {showForm && user && user.firstName && (
                <div
                    className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${nitc})` }}
                >
                    {/* Overlay for blur effect */}
                    <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>

                    {/* Form Container */}
                    <div className="relative bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-300">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center">
                            Add Event
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Form Grid Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    name="eventName"
                                    placeholder="Event Name"
                                    value={formData.eventName}
                                    onChange={handleChange}
                                    className="p-2 border rounded"
                                    required
                                />
                                <input
                                    name="eventType"
                                    placeholder="Event Type (e.g., Webinar, Reunion)"
                                    value={formData.eventType}
                                    onChange={handleChange}
                                    className="p-2 border rounded"
                                    required
                                />
                                <input
                                    name="organizer"
                                    placeholder="Organizer"
                                    value={formData.organizer}
                                    onChange={handleChange}
                                    className="p-2 border rounded"
                                    required
                                />
                                <input
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="p-2 border rounded"
                                    required
                                />
                                <input
                                    name="venue"
                                    placeholder="Venue (or Meeting Link for Online Events)"
                                    value={formData.venue}
                                    onChange={handleChange}
                                    className="p-2 border rounded"
                                    required
                                />
                                <input
                                    name="contactPersonEmail"
                                    type="email"
                                    placeholder="Contact Person Email"
                                    value={formData.contactPersonEmail}
                                    onChange={handleChange}
                                    className="p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Full-width Textareas */}
                            <textarea
                                name="description"
                                placeholder="Event Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded mt-4"
                                required
                            />
                            <textarea
                                name="sponsorshipDetails"
                                placeholder="Sponsorship Details (Optional)"
                                value={formData.sponsorshipDetails}
                                onChange={handleChange}
                                className="w-full p-2 border rounded mt-4"
                            />

                            {/* Submit Button */}
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">
                                Post Event
                            </button>
                        </form>
                    </div>
                </div>
            )}


         
            <div className="relative flex justify-center items-center mb-6">
    <h2 className="text-4xl font-bold text-black text-center">Upcoming Events</h2>
    {user && !showForm && (
        <button
            className="absolute right-0 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-500 transition"
            onClick={() => setShowForm(true)}
        >
            <AiOutlinePlus size={20} /> Add Event
        </button>
    )}
</div>




            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white p-5 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-xl"
                        >
                            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                                <FaRegFileAlt /> {event.eventName}
                            </h3>
                            <p className="text-gray-600 flex items-center gap-2">
                                <AiOutlineUser /> <strong>Organizer:</strong> {event.organizer}
                            </p>
                            <p className="text-gray-500 flex items-center gap-2">
                                <FaMicrophone /> <strong>Type:</strong> {event.eventType}
                            </p>
                            <p className="text-gray-500 flex items-center gap-2">
                                <AiOutlineCalendar /> <strong>Date:</strong> {event.date}
                            </p>
                            <p className="text-gray-500 flex items-center gap-2">
                                <FaLocationArrow /> <strong>Venue:</strong> {event.venue}
                            </p>
                            <p className="mt-3">{event.description}</p>
                            {event.sponsorshipDetails && (
                                <p className="text-sm text-gray-500">💰 <strong>Sponsorship:</strong> {event.sponsorshipDetails}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                                <AiOutlineMail /> <strong>Contact:</strong> {event.contactPersonEmail}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-lg">No events posted yet. Be the first to add one!</p>
                )}
            </div>
        </div>
    );
};

export default Events;
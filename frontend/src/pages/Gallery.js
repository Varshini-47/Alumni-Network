import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import uploadToCloudinary from "../cloudinaryupload";
import { FaFolderOpen } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
    const { user } = useUser();
    const userId = user?.id;

    const [folders, setFolders] = useState([]);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [images, setImages] = useState([]);
    const [uploadMode, setUploadMode] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState("");
    const [selectedImage, setSelectedImage] = useState(null); 

    useEffect(() => {
        axios.get("http://localhost:8080/api/gallery/folders")
            .then(response => setFolders(response.data))
            .catch(error => console.error("Error fetching folders:", error));
    }, []);

    const openFolder = (folder) => {
        setCurrentFolder(folder.folderName);
        axios.get(`http://localhost:8080/api/gallery/folder/${folder.folderName}`)
            .then(response => setImages(response.data))
            .catch(error => console.error("Error fetching images:", error));
    };

    const handleUpload = async () => {
        const finalFolder = folderName || selectedFolder;
        if (!finalFolder || !selectedFile) {
            alert("Folder name and image file are required.");
            return;
        }

        try {
            const imageUrl = await uploadToCloudinary(selectedFile);
            if (!imageUrl) throw new Error("Image upload failed");

            await axios.post("http://localhost:8080/api/gallery/upload", {
                folderName: finalFolder,
                imageUrl,
                userId
            }, { withCredentials: true });

            alert("Image uploaded successfully!");
            setUploadMode(false);
            setFolderName("");
            setSelectedFile(null);
            setSelectedFolder("");
            window.location.reload();
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="min-h-[calc(100vh-180px)] bg-white text-gray-900 p-5">
            <h2 className="text-3xl font-bold text-center mb-5">Gallery</h2>

            {userId && !uploadMode && !currentFolder && (
                <button
                    onClick={() => setUploadMode(true)}
                    className="fixed bottom-[40px] right-5 bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 font-semibold"
                >
                    ➕ Upload Image
                </button>
            )}

            {uploadMode && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-96 transform scale-95 animate-scale-up relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition duration-200"
                            onClick={() => setUploadMode(false)}
                        >
                            ✖
                        </button>
                        <h3 className="text-2xl font-bold text-center mb-5 text-gray-800">📤 Upload Image</h3>
                        <label className="text-sm font-semibold text-gray-700">Select a Folder:</label>
                        <select
                            value={selectedFolder}
                            onChange={(e) => {
                                setSelectedFolder(e.target.value);
                                if (e.target.value) setFolderName(""); 
                            }}
                            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 transition"
                        >
                            <option value="">Choose an existing folder</option>
                            {folders.map(folder => (
                                <option key={folder.folderName} value={folder.folderName}>
                                    {folder.folderName}
                                </option>
                            ))}
                        </select>

                        <label className="text-sm font-semibold text-gray-700">Or Create a New Folder:</label>
                        <input
                            type="text"
                            placeholder="Enter folder name"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                            className={`w-full p-2 border rounded-lg mb-3 transition focus:ring-2 focus:ring-blue-500 ${selectedFolder ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-100 border-gray-300"
                                }`}
                            disabled={selectedFolder}
                        />

                        <label className="text-sm font-semibold text-gray-700">Upload Image:</label>
                        <div className="relative flex items-center border border-gray-300 bg-gray-100 rounded-lg p-2 mb-4">
                            <input
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                            />
                            <span className="text-gray-600">📂 Choose a file...</span>
                        </div>

                        <div className="flex justify-between mt-3">
                            <button
                                onClick={handleUpload}
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition duration-300 flex-1 mr-2"
                            >
                                Upload
                            </button>
                            <button
                                onClick={() => setUploadMode(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-300 flex-1"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!currentFolder && (
                <div>
                    <h3 className="text-lg font-semibold mb-3">Available Folders</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {folders.map(folder => (
                            <div
                                key={folder.folderName}
                                onClick={() => openFolder(folder)}
                                className="flex flex-col items-center justify-center bg-white shadow-lg border border-gray-300 hover:shadow-xl transition duration-300 p-5 rounded-lg cursor-pointer"
                            >
                                <FaFolderOpen size={60} className="text-yellow-500" />
                                <p className="mt-2 text-center text-lg font-medium">{folder.folderName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {currentFolder && (
                <div>
                    <button
                        onClick={() => setCurrentFolder(null)}
                        className="fixed top-[100px] left-5 bg-blue-700 px-4 py-2 rounded text-white hover:bg-blue-900 flex items-center"
                    >
                        <IoArrowBack className="mt-[5px]" /> Back
                    </button>

                    <h3 className="text-lg font-semibold mb-3">📸 Folder: {currentFolder}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Image ${index}`}
                                className="w-full h-40 object-cover cursor-pointer"
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            {selectedImage && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
                    <img src={selectedImage} className="max-w-[50%] max-h-[50%] rounded-lg" />
                    <button className="absolute top-[150px] right-5 text-black text-3xl" onClick={() => setSelectedImage(null)}>✖</button>
                </div>
            )}
        </div>
    );
};

export default Gallery;

import axios from 'axios';
// Cloudinary details
const cloudName = 'dcsomu9n6';  // Replace with your Cloudinary cloud name
const uploadPreset = 'Alumni';  // Replace with your Cloudinary upload preset

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  
  formData.append('file', file);  // Append file to FormData
  formData.append('upload_preset', uploadPreset);  // Cloudinary upload preset

  try {
    // Send POST request to Cloudinary API
    const response = await axios.post(`https://api.cloudinary.com/v1_1/dcsomu9n6/image/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const cloudinaryUrl = response.data.secure_url;  // Get the URL of the uploaded image
    console.log("Image uploaded to Cloudinary at:", cloudinaryUrl);
    return cloudinaryUrl;  // Return the Cloudinary URL for use
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};
 export default uploadToCloudinary;     
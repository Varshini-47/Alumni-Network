import axios from "axios";
const cloudName = "dcsomu9n6";
const uploadPreset = "Alumni";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dcsomu9n6/image/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const cloudinaryUrl = response.data.secure_url;
    console.log("Image uploaded to Cloudinary at:", cloudinaryUrl);
    return cloudinaryUrl;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};
export default uploadToCloudinary;

import axios from "axios";

export const addProperty = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/property/add", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response;
  } catch (error) {
    console.error("Property Service Error:", error.response?.data || error.message);
    throw error;
  }
};
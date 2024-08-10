import axios from "axios";

const API_URL = "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products.json`);
    if (response && response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching products:", error.message);

    if (error.response) {
      console.error(
        "Response error:",
        error.response.status,
        error.response.statusText
      );
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    return [];
  }
};

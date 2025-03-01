import axios from "axios";

export const apiCall = async (url, method = "GET", data = null) => {
  try {
    const options = {
      method,
      url,
      headers: { "Content-Type": "application/json" },
      ...(data && { data }),
    };

    const response = await axios(options);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
};

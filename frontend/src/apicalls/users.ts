const { default: axiosInstance } = require(".");

export const registerUser = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post("/api/users/get-user-info");
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

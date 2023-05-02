const { default: axiosInstance } = require(".");

// add report
export const addReport = async (payload: any) => {
  try {
    const response = await axiosInstance.post(
      "/api/reports/add-report",
      payload
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

// get all reports
export const getAllReports = async (filters: any) => {
  try {
    const response = await axiosInstance.post(
      "/api/reports/get-all-reports",
      filters
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

// get all reports by user
export const getAllReportsByUser = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/reports/get-all-reports-by-user"
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

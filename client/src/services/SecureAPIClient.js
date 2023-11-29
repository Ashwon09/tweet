import axios from "axios";
import { API_BASE_URL } from "../constrants/api-constrants";
import { getCookie } from "../utils/cookie";

const secureAPIinstance = axios.create({
  baseURL: `${API_BASE_URL}`,
});

secureAPIinstance.interceptors.request.use(async (config) => {
  Object.assign(config, {
    headers: { accessToken: getCookie("access-token") },
  });
  if (!config.params) {
    config.params = {};
  }
  return config;
});

secureAPIinstance.interceptors.response.use(
  (response) => {
    // Return the response data
    return response;
  },
  (error) => {
    // Handle errors here
    // You can perform custom error handling here
    // For example, if you want to show a notification or redirect the user
    error.response.data.message
      ? alert(error.response.data.message)
      : alert(error.message);

    return error; // Important to propagate the error
  }
);

export const secureAPI = secureAPIinstance;

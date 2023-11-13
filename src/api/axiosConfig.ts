import axios, { AxiosError, AxiosInstance } from "axios";

// Create an instance of Axios
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string, // TODO Inject from environment
  // withCredentials: true,
});

// Define a custom error handler for API responses
const errorHandler = (error: AxiosError): Promise<never> => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// Register the custom error handler to the "api" axios instance
api.interceptors.response.use(undefined, (error: AxiosError) => {
  return errorHandler(error);
});

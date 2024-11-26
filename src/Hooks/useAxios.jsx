import axios from "axios";

// export const baseURL = "https://happy-shopping-server.vercel.app";
export const baseURL = "http://localhost:5000";

const axiosSecure = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

const useAxios = () => {
  return axiosSecure;
};

export default useAxios;

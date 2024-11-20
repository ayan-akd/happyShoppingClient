import axios from "axios";

export const baseURL2 = "http://localhost:5000";
// export const baseURL2 = "https://happy-shopping-server.vercel.app";

const axiosPublic = axios.create({
  baseURL: baseURL2,
  withCredentials: true,
});

export default axiosPublic;

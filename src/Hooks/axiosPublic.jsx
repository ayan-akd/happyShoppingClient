import axios from "axios";
import { baseURL } from "./useAxios";

const axiosPublic = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default axiosPublic;

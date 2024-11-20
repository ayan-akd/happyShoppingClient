import axios from "axios";
import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

export const baseURL = "https://wanderland-server.vercel.app";

const axiosSecure = axios.create({
  // baseURL: "https://wanderland-server.vercel.app",
  baseURL: baseURL,
  withCredentials: true,
});

const useAxios = () => {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error in interceptors: ", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          signOutUser()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return Promise.reject(error);
      }
    );
  }, [navigate, signOutUser]);
  return axiosSecure;
};

export default useAxios;

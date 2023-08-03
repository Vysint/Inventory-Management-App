import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_REACT_API_URL;

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userData
    );
    if ((response.statusText = "OK")) {
      toast.success("User Registered successfully");
    }
    return response.data;
  } catch (err) {
    const message =
      (err.response && err.response.data && err.esponse.data.message) ||
      err.message ||
      err.toString();
    toast.error(message);
  }
};

// Email Validation
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/users/login`,
      userData
    );
    if ((response.statusText = "OK")) {
      toast.success("Login successfully");
    }
    return response.data;
  } catch (err) {
    const message =
      (err.response && err.response.data && err.esponse.data.message) ||
      err.message ||
      err.toString();
    toast.error(message);
  }
};

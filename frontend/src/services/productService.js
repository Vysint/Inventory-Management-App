import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_REACT_API_URL;
const API_URL = `${BACKEND_URL}/api/products`;

// Create new product

export const createNewProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all Products
export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

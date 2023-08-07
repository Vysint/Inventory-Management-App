import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createNewProduct } from "../../../services/productService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSucccess: false,
  isLoading: false,
  message: [],
};

// Create a new product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunk) => {
    try {
      return await createNewProduct(formData);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE: (state, value) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSucccess = true;
      console.log(action.payload);
      state.products.push(action.payload);
      toast.success("Product added successfully");
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    });
  },
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export default productSlice.reducer;

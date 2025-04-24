import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstances from "../services/axiosinstances.js";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (keyword = '') => {
    try {
      const response = await axiosinstances.get(`/getproducts?keyword=${keyword}`);
      // console.log("API Response:", response.data); // Used for Debugging the code if there is error
      return response.data; // Ensure API returns { products: [...] }
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id) => {
    try {
      const response = await axiosinstances.get(`/getbyid/${id}`);
      // console.log("API Response:", response.data); // Used for Debugging the code if there is error
      return response.data; // Ensure API returns { product: {...] }
    } catch (error) {
      throw new Error(`Error fetching product with id: ${id}`);
    }
  }
)

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    try {
      const response = await axiosinstances.post("/create", product);
      return response.data;
    } catch (error) {
      throw new Error("Error creating product");
    }
  }
)

// export const postProduct = createAsyncThunk(
//   "products/postProduct",
//   async (productdata) => {
//     try {
//       const response = await axiosinstances.post("/create", productdata);
//       return response.data;
//     } catch (error) {
//       throw new Error("Error creating product");
//     }
//   }
// );

const productSlice = createSlice({
  name: "products", // Ensure the name matches useSelector((state) => state.products)
  initialState: {
    products: [],
    error: null,
    loading: false,
    selectedProduct: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload; // Ensure API returns an array
        state.loading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // .addCase(postProduct.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(postProduct.fulfilled, (state, action) => {
      //   state.products.push(action.payload);
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addCase(postProduct.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      .addCase(getProductById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default productSlice.reducer;

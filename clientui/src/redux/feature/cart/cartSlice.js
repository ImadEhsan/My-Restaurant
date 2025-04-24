import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstances from "../services/axiosinstances";

export const addCartProduct = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user?.data._id;
      if (!userId) return rejectWithValue("User not authenticated");
      const response = await axiosinstances.post("/addcart", { userId, productId, quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add product");
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user?.data._id;
      if (!userId) return rejectWithValue("User not authenticated");
      const response = await axiosinstances.get(`/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);

export const incrementCartItem = createAsyncThunk(
  "cart/increment",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user?.data._id;
      if (!userId) return rejectWithValue("User not authenticated");
      const response = await axiosinstances.patch("/increment", { userId, productId });
      return { productId, updatedCart: response.data.cart };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to increment quantity");
    }
  }
);

export const decrementCartItem = createAsyncThunk(
  "cart/decrement",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user?.data._id;
      if (!userId) return rejectWithValue("User not authenticated");
      const response = await axiosinstances.patch("/decrement", { userId, productId });
      return { productId, updatedCart: response.data.cart };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to decrement quantity");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/remove",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user?.data._id;
      if (!userId) return rejectWithValue("User not authenticated");
      const response = await axiosinstances.delete("/remove", { data: { userId, productId } });
      return { productId, updatedCart: response.data.cart };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove product");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], totalPrice: 0, loading: false, error: null },
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.cart.items || [];
        state.totalPrice = action.payload.cart.total || 0;
      })
      .addCase(addCartProduct.fulfilled, (state, action) => {
        state.cartItems = action.payload.cart.items || [];
        state.totalPrice = action.payload.cart.total || 0;
      })
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        if (action.payload && action.payload.cart) {
            state.cartItems = [...action.payload.cart.items]; // ✅ Update state properly
            state.totalPrice = action.payload.cart.total;
        }
    })
    .addCase(decrementCartItem.fulfilled, (state, action) => {
        if (action.payload && action.payload.cart) {
            state.cartItems = [...action.payload.cart.items]; // ✅ Make sure items persist
            state.totalPrice = action.payload.cart.total;
        }
    })
    
    .addCase(removeCartItem.fulfilled, (state, action) => {
      if (action.payload && action.payload.cart) {
          state.cartItems = [...action.payload.cart.items]; // ✅ Update cart items correctly
          state.totalPrice = action.payload.cart.total;  // ✅ Update total price
      }
  });
  
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

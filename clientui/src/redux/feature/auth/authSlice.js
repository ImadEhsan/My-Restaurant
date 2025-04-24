import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstances from "../services/axiosinstances";
import axios from "axios";

// Signup user
export const Signupuser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      // const response = await axiosinstances.post("/signup", userData);
      const response = await axiosinstances.post("/signup", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosinstances.post("/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Logout user
export const logoutuser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axios.post("http://localhost:8080/api/logout", {}, { withCredentials: true });
      const response = await axiosinstances.post("/logout", {}, { withCredentials: true });
      console.log("Logout Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
    isLoading: false,
    authenticate: !!localStorage.getItem("user"),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.authenticate = false;
      localStorage.removeItem("user"); // ✅ Remove user from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup Cases
      .addCase(Signupuser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Signupuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.authenticate = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(Signupuser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.authenticate = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout Cases
      .addCase(logoutuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutuser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.authenticate = false;
        localStorage.removeItem("user"); // ✅ Clear localStorage on logout
      })
      .addCase(logoutuser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

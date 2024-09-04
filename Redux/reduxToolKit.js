import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  userData: null,
  status: "idle",
  error: null,
};

// Define a thunk for fetching user data
export const fetchUserData = createAsyncThunk("apiFetch", async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  const data = await response.json();
  return data;
});

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      localStorage.removeItem("fittrack-app-token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the action creators and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;

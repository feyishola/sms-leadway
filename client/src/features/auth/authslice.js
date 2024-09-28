import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ControllerService } from "./authservice";
// import { registerService } from "./authservice";

// trying to make redux store persistent with the aid of localstorage. this is wrong but it kinda works
const fakePersistentUserData = localStorage.getItem("userData");

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isVerified: false,
  isLoggedIn: false,
  userData: fakePersistentUserData ? JSON.parse(fakePersistentUserData) : null,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    try {
      // const res = await registerService("/api",user) // first method using fetch api
      const res = await ControllerService.register(user);

      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verify",
  async (activationCodes, thunkApi) => {
    try {
      const res = await ControllerService.verifyUser(activationCodes);
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkApi) => {
    try {
      const res = await ControllerService.login(payload);
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isVerified = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isVerified = false;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoggedIn = true;
        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isLoggedIn = false;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;

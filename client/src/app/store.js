import { configureStore } from "@reduxjs/toolkit";
import authslice from "../features/auth/authslice";

export const store = configureStore({
  reducer: {
    auth: authslice,
  },
});

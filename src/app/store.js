import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import leadsReducer from "../features/leads/leadsSlice";

// Load initial state from localStorage
const loadState = () => {
  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      return { auth: { user, token } };
    }
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
  }
  return undefined;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leads: leadsReducer,
  },
  preloadedState: loadState(),
});

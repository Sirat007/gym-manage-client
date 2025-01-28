import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

// Base query with token handling
const baseQuery = fetchBaseQuery({
  baseUrl: "https://gym-manage-delta.vercel.app", // Replace with your Django backend URL
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the auth slice of the Redux store
    const token = getState().auth.token;
    console.log("🚀 ~ token:", token);

    // If the token exists, add it to the headers
    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }

    return headers;
  },
});

// Base query with error handling
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Handle errors
  if (result?.error) {
    if (result.error.status === 401) {
      // Unauthorized: Logout the user
      api.dispatch(logout());
      toast.error("Session expired. Please Login again.");
    } else if (result.error.status === 403) {
      // Forbidden: Show access denied message
      toast.error("You do not have permission to perform this action.");
    } else if (result.error.status === 404) {
      // Not Found: Show resource not found message
      toast.error("Resource not found.");
    } else {
      // Generic error message
      toast.error("An error occurred. Please try again.");
    }
  }

  return result;
};

// Create the API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: [], // Add your tag types here
  endpoints: () => ({}), // Define endpoints in separate files or here
});

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../redux/features/auth/authSlice";

const useGetAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Get the current user and token from the Redux store
  const user = useSelector(selectCurrentUser);
  const token = useSelector(useCurrentToken);

  useEffect(() => {
    // Set loading to true while checking authentication status
    setIsLoading(true);

    // Check if the user is authenticated
    if (user && user?.user_id && token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Simulate a delay (e.g., async operation or Redux store update)
    const timeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false after checking
    }, 500); // Adjust the delay as needed

    // Cleanup timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [user, token]);

  return { isLoggedIn, isLoading }; // Return both states
};

export default useGetAuthStatus;

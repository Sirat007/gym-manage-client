import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  useCurrentToken,
  useCurrentUserType,
} from "../redux/features/auth/authSlice";

const useGetAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [userTypeInfo, setUserType] = useState(null);

  // Get the current user and token from the Redux store
  const user = useSelector(selectCurrentUser);
  const token = useSelector(useCurrentToken);
  const userType = useSelector(useCurrentUserType);
  // console.log("🚀 ~ useGetAuthStatus ~ userType:", userType);

  useEffect(() => {
    // Set loading to true while checking authentication status
    setIsLoading(true);

    // Check if the user is authenticated
    if (user && user?.user_id && token) {
      setIsLoggedIn(true);
      setUserType(userType);
    } else {
      setIsLoggedIn(false);
    }

    // Simulate a delay (e.g., async operation or Redux store update)
    const timeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false after checking
    }, 500); // Adjust the delay as needed

    // Cleanup timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [user, token, userType]);

  return { isLoggedIn, isLoading, userTypeInfo }; // Return both states
};

export default useGetAuthStatus;

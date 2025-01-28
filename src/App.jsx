import { Navigate, Route, Routes } from "react-router";
import MainLayout from "./layouts/main";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ClassesPage from "./pages/classes";
import SignInPage from "./pages/auth/sign-in";
import ClassDetailsPage from "./pages/class-details";
import SignUpPage from "./pages/auth/sign-up";
import ProfilePage from "./pages/profile";
import PricingPlansPage from "./pages/plans";
import useGetAuthStatus from "./hooks/useGetAuthStatus";
import { Spin } from "antd";
import MembersPage from "./pages/members";

function App() {
  const { isLoading, isLoggedIn } = useGetAuthStatus();
  if (isLoading) {
    return (
      <div className=" h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    ); // Or a loading spinner
  }
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Protected routes */}
        {isLoggedIn ? (
          <>
            <Route index element={<HomePage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/plans" element={<PricingPlansPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/classes/:id" element={<ClassDetailsPage />} />
            <Route path="/members" element={<MembersPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/sign-in" />} />
        )}
      </Route>
    </Routes>
  );
}

export default App;

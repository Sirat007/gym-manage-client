import { Outlet, useLocation } from "react-router";
import Navbar from "../../components/shared/navbar";
import Footer from "../../components/shared/footer";
import useGetAuthStatus from "../../hooks/useGetAuthStatus";

const MainLayout = () => {
  const location = useLocation();
  console.log("🚀 ~ MainLayout ~ location:", location.pathname);
  const hideNavbarAndFooterRoutes = ["/", "/sign-in", "/sign-up"];
  const hideFooterRoutes = ["/sign-in", "/sign-up"];
  const { isLoggedIn, userTypeInfo, isLoading } = useGetAuthStatus();
  return (
    <div>
      {!hideNavbarAndFooterRoutes.includes(location.pathname) && (
        <Navbar
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          userTypeInfo={userTypeInfo}
        />
      )}
      <div className=" min-h-[80vh]">
        <Outlet />
      </div>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default MainLayout;

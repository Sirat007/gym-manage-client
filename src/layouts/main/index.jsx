import { Outlet, useLocation } from "react-router";
import Navbar from "../../components/shared/navbar";
import Footer from "../../components/shared/footer";

const MainLayout = () => {
  const location = useLocation();
  console.log("🚀 ~ MainLayout ~ location:", location.pathname);
  const hideNavbarAndFooterRoutes = ["/", "/sign-in", "/sign-up"];
  const hideFooterRoutes = ["/sign-in", "/sign-up"];
  return (
    <div>
      {!hideNavbarAndFooterRoutes.includes(location.pathname) && <Navbar />}
      <div className=" min-h-[80vh]">
        <Outlet />
      </div>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default MainLayout;

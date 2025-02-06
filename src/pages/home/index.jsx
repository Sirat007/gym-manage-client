import { Spin } from "antd";
import { useProfileQuery } from "../../redux/features/auth/authApi";
import ClassesHome from "./classes";
import ContactUs from "./contact-us";
import Hero from "./hero";
import WhyChooseUs from "./why-us";
import StaffHero from "./staff-hero";
import useGetAuthStatus from "../../hooks/useGetAuthStatus";

const HomePage = () => {
  const { data, isLoading: profileLoading } = useProfileQuery();
  const { userTypeInfo: userType, isLoading, isLoggedIn } = useGetAuthStatus();
  console.log("🚀 ~ HomePage ~ userType:", userType);
  console.log("🚀 ~ HomePage ~ data:", data);
  return (
    <>
      {isLoading || profileLoading ? (
        <div className=" h-screen flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          {userType === "member" ? (
            <>
              <Hero
                userTypeInfo={userType}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
              />
              <ClassesHome />
              <ContactUs />
              <WhyChooseUs />
            </>
          ) : (
            <>
              <Hero />
              <StaffHero />
              {/* <ClassesHome /> */}
              {/* <ContactUs /> */}
              {/* <WhyChooseUs /> */}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;

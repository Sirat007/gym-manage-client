import { Spin } from "antd";
import { useProfileQuery } from "../../redux/features/auth/authApi";
import ClassesHome from "./classes";
import ContactUs from "./contact-us";
import Hero from "./hero";
import WhyChooseUs from "./why-us";
import StaffHero from "./staff-hero";

const HomePage = () => {
  const { data, isLoading } = useProfileQuery();
  return (
    <>
      {isLoading ? (
        <div className=" h-screen flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          {data?.length && data[0]?.user?.user_type == "member" ? (
            <>
              <Hero />
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

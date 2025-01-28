import heroVideo from "../../../assets/video/bg.mp4";
import Navbar from "../../../components/shared/navbar";
import { useProfileQuery } from "../../../redux/features/auth/authApi";

const Hero = () => {
  const { data } = useProfileQuery();
  return (
    <>
      {data?.length && data[0]?.user?.user_type === "member" ? (
        <div className="relative w-full snap-section min-h-screen">
          <div className=" max-w-7xl mx-auto">
            <Navbar />
          </div>
          {/* Video background */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
            autoPlay
            loop
            muted
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          {/* Content over the video */}
          <div className="absolute hidden md:block top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white md:text-center z-10">
            <h3 className="text-4xl sm:text-4xl md:text-5xl font-bold mb-6">
              Welcome to <span className="text-blue-800">PulsePoint</span>
            </h3>
            <p className="text-xl sm:text-2xl mb-8">
              Unleash Your Potential with Our World-Class Fitness Facilities!
            </p>
          </div>
          <div className="absolute md:hidden  flex flex-col h-full items-center justify-center px-4 text-white md:text-center z-10">
            <h3 className="text-4xl sm:text-4xl md:text-5xl font-bold mb-6">
              Welcome to <span className="text-blue-800">PulsePoint</span>
            </h3>
            <p className="text-xl sm:text-2xl mb-8">
              Unleash Your Potential with Our World-Class Fitness Facilities!
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full pb-10">
          <div className=" max-w-7xl mx-auto">
            <Navbar />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;

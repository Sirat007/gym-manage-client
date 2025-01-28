import { useNavigate } from "react-router";

const StaffHero = () => {
  const navigate = useNavigate();
  return (
    <div className=" min-h-[70vh] max-w-7xl px-4 mx-auto py-16 flex items-center">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 w-full">
        <div
          onClick={() => navigate("/classes")}
          className=" hover:bg-blue-800 cursor-pointer transition-all duration-300 ease-in-out text-lg font-semibold flex items-center justify-center bg-blue-700 text-white p-10 rounded-md shadow"
        >
          <div className=" w-full text-center">
            <span>Classes</span>
          </div>
        </div>
        <div
          onClick={() => navigate("/plans")}
          className=" hover:bg-blue-800 cursor-pointer transition-all duration-300 ease-in-out text-lg font-semibold flex items-center justify-center bg-blue-700 text-white p-10 rounded-md shadow"
        >
          <div className=" w-full text-center">
            <span>Plans</span>
          </div>
        </div>
        <div
          onClick={() => navigate("/members")}
          className=" hover:bg-blue-800 cursor-pointer transition-all duration-300 ease-in-out text-lg font-semibold flex items-center justify-center bg-blue-700 text-white p-10 rounded-md shadow"
        >
          <div className=" w-full text-center">
            <span>Members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffHero;

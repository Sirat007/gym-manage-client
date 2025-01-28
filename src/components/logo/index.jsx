import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} className=" cursor-pointer">
      <span className=" font-bold text-2xl">
        <span className=" text-blue-600">Pulse</span>Point
      </span>
    </div>
  );
};

export default Logo;

import { ArrowRight, Loader, PlusCircle } from "lucide-react";
import ClassCard from "../../../components/cards/classes";
import { useGetClassListQuery } from "../../../redux/features/classes/classApi";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router";
import { useProfileQuery } from "../../../redux/features/auth/authApi";

const ClassesHome = () => {
  const { data: profile } = useProfileQuery();
  console.log("🚀 ~ ClassesHome ~ profile:", profile);
  const { data, isLoading, isError, isSuccess } = useGetClassListQuery();
  console.log("🚀 ~ ClassesHome ~ data:", data);

  const navigate = useNavigate();

  // decide what to render
  let content;

  if (isLoading && !isError) {
    content = (
      <div className=" w-full">
        <div>
          <h6 className=" text-2xl font-semibold">
            {profile?.length && profile[0]?.user?.user_type === "member"
              ? "Explore Our Fitness Classes"
              : "Class List"}
          </h6>
          <hr className=" w-28 mt-2 bg-blue-700 h-1" />
        </div>
        <div className=" w-full flex justify-center items-center min-h-[40vh]">
          {/* <Loader className=" block animate-spin" size={50} /> */}
          <Spin size="large" />
        </div>
      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div className=" w-full">
        <div>
          <h6 className=" text-2xl font-semibold">
            {profile?.length && profile[0]?.user?.user_type === "member"
              ? "Explore Our Fitness Classes"
              : "Class List"}
          </h6>
          <hr className=" w-28 mt-2 bg-blue-700 h-1" />
          {/* <p className=" mt-3">
  From High-Intensity Workouts to Mindful Practices, We Have Something
  for Everyone
</p> */}
        </div>
        <div className=" w-full flex justify-center items-center min-h-[40vh]">
          <p className=" bg-red-400 px-10 py-1 text-white rounded-md">
            Something went wrong!
          </p>
        </div>
      </div>
    );
  } else if (isSuccess && !data?.length) {
    content = (
      <div className=" w-full">
        <div>
          <h6 className=" text-2xl font-semibold">
            {profile?.length && profile[0]?.user?.user_type === "member"
              ? "Explore Our Fitness Classes"
              : "Class List"}
          </h6>
          <hr className=" w-28 mt-2 bg-blue-700 h-1" />
          {/* <p className=" mt-3">
From High-Intensity Workouts to Mindful Practices, We Have Something
for Everyone
</p> */}
        </div>
        <div className=" w-full flex justify-center items-center min-h-[40vh]">
          <p className=" bg-red-400 px-10 py-1 text-white rounded-md">
            No data found
          </p>
        </div>
      </div>
    );
  } else {
    content = (
      <div className=" w-full min-h-[70vh]">
        <div>
          <h6 className=" text-2xl font-semibold">
            {profile?.length && profile[0]?.user?.user_type === "member"
              ? "Explore Our Fitness Classes"
              : "Class List"}
          </h6>
          <hr className=" w-28 mt-2 bg-blue-700 h-1" />
          {/* <p className=" mt-3">
    From High-Intensity Workouts to Mindful Practices, We Have Something
    for Everyone
  </p> */}
        </div>
        <div className=" mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map?.((cls) => (
            <ClassCard key={cls.id} classData={cls} />
          ))}
        </div>
        <div className=" px-4 pb-4 flex justify-center mt-10 items-center gap-3">
          <Button
            size="large"
            type="default"
            onClick={() => navigate(`/classes`)}
          >
            <span>View All</span>
            <ArrowRight />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className=" max-w-7xl mx-auto flex items-center  py-20 px-4">
      {content}
    </div>
  );
};

export default ClassesHome;

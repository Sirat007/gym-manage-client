// import ClassCard from "../../components/cards/classes";

// const ClassesPage = () => {
//   const classes = [
//     {
//       id: 1,
//       name: "Yoga",
//       instructor: "Shayan",
//       schedule: "2025-01-01T18:00:00Z",
//       description: "This is good",
//     },
//     {
//       id: 3,
//       name: "Cycling",
//       instructor: "Asaduzzaman",
//       schedule: "2025-02-12T00:00:00Z",
//       description: "This is good",
//     },
//     {
//       id: 4,
//       name: "Walking",
//       instructor: "Md Saidul",
//       schedule: "2025-01-31T11:31:23Z",
//       description: "This is good",
//     },
//     {
//       id: 5,
//       name: "Burn Calori",
//       instructor: "Md Asad Jr",
//       schedule: "2025-01-16T00:00:00Z",
//       description: "This is good",
//     },
//     {
//       id: 6,
//       name: "Zumba",
//       instructor: "Md Shafi",
//       schedule: "2025-01-16T00:00:00Z",
//       description: "This is good",
//     },
//     {
//       id: 7,
//       name: "Boxing",
//       instructor: "Md Saidul",
//       schedule: "2025-01-31T18:00:00Z",
//       description: "This is good",
//     },
//     {
//       id: 8,
//       name: "Spin",
//       instructor: "Rahim mia",
//       schedule: "2025-01-17T18:00:00Z",
//       description: "This is good",
//     },
//   ];
//   return (
//     <div className=" max-w-7xl mx-auto flex-col justify-center min-h-screen py-20 px-4">
//       <div
//         className=" mb-4 rounded-md h-[30vh]"
//         style={{
//           backgroundImage:
//             'url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80")',
//           backgroundAttachment: "fixed",
//           backgroundPosition: "bottom center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundBlendMode: "color",
//         }}
//       ></div>
//       <div className=" w-full">
//         <div>
//           <h6 className=" text-2xl font-semibold">
//             Explore Our Fitness Classes
//           </h6>
//           <hr className=" w-48 mt-2 bg-blue-700 h-1" />
//           {/* <p className=" mt-3">
//         From High-Intensity Workouts to Mindful Practices, We Have Something
//         for Everyone
//       </p> */}
//         </div>
//         <div className=" mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {classes?.map((cls) => (
//             <ClassCard key={cls.id} classData={cls} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassesPage;

import {
  useAddClassMutation,
  useGetClassListQuery,
} from "../../redux/features/classes/classApi";
import ClassCard from "../../components/cards/classes";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProfileQuery } from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const ClassesPage = () => {
  const { data, isLoading, isError, isSuccess } = useGetClassListQuery();
  console.log("🚀 ~ ClassesHome ~ data:", data);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);

  const { data: profile } = useProfileQuery();

  const [
    addClass,
    { isLoading: addLoading, isError: addError, isSuccess: addSuccess },
  ] = useAddClassMutation();

  useEffect(() => {
    if (addSuccess) {
      toast.success("Class added successsfully");
      setOpen(false);
    }
  }, [addSuccess]);
  useEffect(() => {
    if (addError) {
      toast.error("Failed to add class");
    }
  }, [addError]);

  const onFinish = async (values) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    try {
      // const userInfo = {
      //   username: values?.username,
      //   password: values?.password,
      // };
      // Call the register function (assuming it returns a promise)
      await addClass(values);
    } catch (error) {
      // console.log("🚀 ~ onFinishFailed ~ error:", error);

      // Show the error message in a toast
      toast.error(error.message || "Something went wrong");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    // message.error("Please fill in all fields correctly.");
  };

  // decide what to render
  let content;

  if (isLoading && !isError) {
    content = (
      //     <div className=" w-full">
      //       {profile?.length && profile[0]?.user?.user_type === "member" ? (
      //         <div
      //           className=" mb-4 rounded-md h-[30vh]"
      //           style={{
      //             backgroundImage:
      //               'url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80")',
      //             backgroundAttachment: "fixed",
      //             backgroundPosition: "bottom center",
      //             backgroundSize: "cover",
      //             backgroundRepeat: "no-repeat",
      //             backgroundBlendMode: "color",
      //           }}
      //         ></div>
      //       ) : null}

      //       <div>
      //         <h6 className=" text-2xl font-semibold">
      //           {profile?.length && profile[0]?.user?.user_type === "member"
      //             ? "Explore Our Fitness Classes"
      //             : "Class List"}
      //         </h6>
      //         <hr className=" w-20 mt-2 bg-blue-700 h-1" />
      //         {/* <p className=" mt-3">
      //   From High-Intensity Workouts to Mindful Practices, We Have Something
      //   for Everyone
      // </p> */}
      //       </div>
      <div className=" w-full flex justify-center items-center min-h-[80vh]">
        {/* <Loader className=" block animate-spin" size={50} /> */}
        <Spin size="large" />
      </div>
      // </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div className=" w-full">
        {profile?.length && profile[0]?.user?.user_type === "member" ? (
          <div
            className=" mb-4 rounded-md h-[30vh]"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80")',
              backgroundAttachment: "fixed",
              backgroundPosition: "bottom center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "color",
            }}
          ></div>
        ) : null}

        <div>
          <h6 className=" text-2xl font-semibold">
            {profile?.length && profile[0]?.user?.user_type === "member"
              ? "Explore Our Fitness Classes"
              : "Class List"}
          </h6>
          <hr className=" w-20 mt-2 bg-blue-700 h-1" />
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
        {profile?.length && profile[0]?.user?.user_type === "member" ? (
          <div
            className=" mb-4 rounded-md h-[30vh]"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80")',
              backgroundAttachment: "fixed",
              backgroundPosition: "bottom center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "color",
            }}
          ></div>
        ) : null}

        <div>
          <h6 className=" text-2xl font-semibold">
            {profile?.length && profile[0]?.user?.user_type === "member"
              ? "Explore Our Fitness Classes"
              : "Class List"}
          </h6>
          <hr className=" w-20 mt-2 bg-blue-700 h-1" />
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
      <div
        className={`w-full min-h-screen ${
          profile?.length && profile[0]?.user?.user_type === "member"
            ? "pt-0"
            : "pt-10"
        }`}
      >
        {profile?.length && profile[0]?.user?.user_type === "member" ? (
          <div
            className=" mb-4 rounded-md h-[30vh]"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80")',
              backgroundAttachment: "fixed",
              backgroundPosition: "bottom center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "color",
            }}
          ></div>
        ) : null}

        <div>
          <h6 className=" text-2xl font-semibold">
            {profile?.length && profile[0]?.user?.user_type === "member"
              ? "Explore Our Fitness Classes"
              : "Class List"}
          </h6>
          <hr className=" w-20 mt-2 bg-blue-700 h-1" />
          {/* <p className=" mt-3">
    From High-Intensity Workouts to Mindful Practices, We Have Something
    for Everyone

  </p> */}
          {profile?.length &&
          profile[0]?.user?.user_type === "member" ? null : (
            <div className=" flex justify-end">
              <Button
                loading={addLoading}
                type="primary"
                size="large"
                onClick={showDrawer}
              >
                Add Class
              </Button>
            </div>
          )}

          <Drawer onClose={onClose} open={open}>
            <Form
              name="signin"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please enter the class name!" },
                ]}
              >
                <Input placeholder="Class Name" />
              </Form.Item>

              <Form.Item
                name="instructor"
                rules={[
                  {
                    required: true,
                    message: "Please enter the instructor name!",
                  },
                ]}
              >
                <Input placeholder="Instructor Name" />
              </Form.Item>
              <Form.Item
                name="schedule"
                rules={[
                  { required: true, message: "Please enter the schedule!" },
                ]}
              >
                <Input type="datetime-local" />
              </Form.Item>

              <Form.Item
                name="description"
                rules={[
                  { required: true, message: "Please enter the description!" },
                ]}
              >
                <Input.TextArea placeholder="Description" />
              </Form.Item>

              {/* Sign In Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={addLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add Class
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
        </div>
        <div className=" mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((cls) => (
            <ClassCard key={cls.id} classData={cls} />
          ))}
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

export default ClassesPage;

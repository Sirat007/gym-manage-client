import { useEffect, useState } from "react";
import {
  Tabs,
  Form,
  Input,
  Button,
  Select,
  message,
  Spin,
  Skeleton,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
  UserAddOutlined,
  FieldTimeOutlined,
  InfoCircleOutlined,
  MoneyCollectFilled,
} from "@ant-design/icons";
import { Badge, Mail, User, UserSquare } from "lucide-react";
import {
  useBookingListQuery,
  useEditProfileMutation,
  useProfileQuery,
} from "../../redux/features/auth/authApi";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
// import { store } from "../../redux/store";
import { useSelector } from "react-redux";
import { useGetClassListQuery } from "../../redux/features/classes/classApi";
import { useGetPlanListQuery } from "../../redux/features/plans/planApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const { Option } = Select;

const ProfilePage = () => {
  const navigate = useNavigate();
  // console.log(store.getState());
  const [form] = Form.useForm();
  // const user = useSelector(selectCurrentUser);
  // console.log("🚀 ~ ProfilePage ~ user:", user);

  const {
    data: plans,
    // refetch,
  } = useGetPlanListQuery();

  const [selectedPlan, setSelectedPlan] = useState(null);

  const [profileData, setProfileData] = useState({
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "********", // Placeholder for password
    userType: "member",
  });

  const [
    editProfile,
    { isLoading: editLoading, isError: editError, isSuccess },
  ] = useEditProfileMutation();

  const onFinish = async (values) => {
    console.log("Updated Profile:", values);
    setProfileData(values); // Update profile data
    try {
      await editProfile({
        id: data?.length && data[0]?.id,
        userInfo: {
          user: {
            first_name: values?.firstName,
            last_name: values?.lastName,
            email: values?.email,
          },
        },
      });
    } catch (error) {
      console.log("🚀 ~ onFinish ~ error:", error);
      toast.error("Failed to update profile");
    }
    // message.success("Profile updated successfully!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill in all fields correctly.");
  };

  const {
    data,
    isLoading: isUserLoading,
    isError: isUserError,
    isSuccess: isUserFetchSuccess,
    refetch: refecthProfile,
  } = useProfileQuery();

  useEffect(() => {
    if (editError) {
      toast.error("Failed to update profile");
    }
  }, [editError]);
  useEffect(() => {
    if (isSuccess) {
      refecthProfile();
      toast.success("Profile updated successfully!");
    }
  }, [isSuccess, refecthProfile]);

  useEffect(() => {
    if (isUserFetchSuccess && data?.length) {
      setProfileData({
        username: data[0]?.user?.first_name,
        firstName: data[0]?.user?.first_name,
        lastName: data[0]?.user?.last_name,
        email: data[0]?.user?.email,
        password: "********", // Placeholder for password
        userType: "member",
      });
      const selectedPln = plans?.find((p) => p?.id == data[0]?.plan);
      setSelectedPlan(selectedPln);
    }
  }, [isUserFetchSuccess, data, plans]);

  const {
    data: bookingList,
    isLoading,
    isError,
    refetch,
  } = useBookingListQuery();
  // console.log("🚀 ~ ProfilePage ~ bookingList:", bookingList);
  // console.log("🚀 ~ ProfilePage ~ data:", data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { data: classData, isLoading: isClassLoading } = useGetClassListQuery();
  // console.log("🚀 ~ ProfilePage ~ classData:", classData);

  const getClassName = (classID) => {
    const c = classData?.find((cls) => cls?.id == classID);
    // console.log("class", c);
    return c?.name || "Loading..";
  };
  const getInsName = (classID) => {
    const c = classData?.find((cls) => cls?.id == classID);
    // console.log("class", c);
    return c?.instructor || "Loading..";
  };

  // Define tabs using the `items` prop
  const tabItems = [
    {
      key: "view",
      label: "View Profile",
      children: (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <hr className="my-2 border-gray-200" />
              <div className="space-y-4">
                {/* Username */}
                {/* <div className="flex items-center space-x-4">
                  <User className="w-5 h-5 text-gray-600" />
                  <p className="text-gray-600">
                    <strong>Username:</strong> {data[0]?.user?.username}
                  </p>
                </div> */}
                {/* First Name */}
                <div className="flex items-center space-x-4">
                  <Badge className="w-5 h-5 text-gray-600" />
                  <p className="text-gray-600">
                    <strong>First Name:</strong>{" "}
                    {data?.length && data[0]?.user?.first_name}
                  </p>
                </div>
                {/* Last Name */}
                <div className="flex items-center space-x-4">
                  <Badge className="w-5 h-5 text-gray-600" />
                  <p className="text-gray-600">
                    <strong>Last Name:</strong>{" "}
                    {data?.length && data[0]?.user?.last_name}
                  </p>
                </div>
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <p className="text-gray-600">
                    <strong>Email:</strong>{" "}
                    {data?.length && data[0]?.user?.email}
                  </p>
                </div>
                {/* User Type */}
                <div className="flex items-center space-x-4">
                  <UserSquare className="w-5 h-5 text-gray-600" />
                  <p className="text-gray-600">
                    <strong>User Type:</strong>{" "}
                    {/* {profileData.userType === "member" ? "Member" : "Staff"} */}
                    {data?.length && data[0]?.user?.user_type}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <MoneyCollectFilled className="w-5 h-5 text-gray-600" />
                  <p className="text-gray-600">
                    <strong>Selected Plan:</strong>{" "}
                    {/* {profileData.userType === "member" ? "Member" : "Staff"} */}
                    {selectedPlan
                      ? `${selectedPlan?.name?.toUpperCase()} ($${
                          selectedPlan?.price
                        })`
                      : "NA"}
                  </p>
                  <Button
                    onClick={() => navigate("/plans")}
                    variant="filled"
                    color="primary"
                  >
                    {selectedPlan ? "Change Plan" : "Select Plan"}
                  </Button>
                </div>
              </div>
            </div>
            {data?.length && data[0]?.user?.user_type === "member" ? (
              <div>
                <h5 className=" text-md font-semibold pb-2 border-b border-gray-300">
                  Booking List
                </h5>

                <div className=" min-h-[30vh] flex items-center justify-center">
                  {isLoading && !isError ? (
                    <div>
                      <Spin size="large" />
                    </div>
                  ) : null}
                  {!isLoading && isError ? (
                    <div className=" bg-red-200 p-4 rounded-md font-semibold">
                      <span>Failed to fetch bookings!</span>
                    </div>
                  ) : null}
                  {bookingList && !bookingList?.length ? (
                    <div className=" p-4 rounded-md font-semibold">
                      <span>No booking found!</span>
                    </div>
                  ) : null}
                  <div className=" grid grid-cols-1 md:grid-cols-2 mt-3 lg:grid-cols-2 items-center gap-3">
                    {bookingList && bookingList?.length ? (
                      <>
                        {bookingList?.map((booking) => (
                          <div key={booking?.id}>
                            <div className=" shadow hover:shadow-lg rounded-md border border-gray-100">
                              <div className=" divide-y space-y-1 bg-white">
                                <h3 className="text-lg font-semibold pb-3 p-4">
                                  {isClassLoading ? (
                                    <Skeleton.Input active size="small" />
                                  ) : (
                                    getClassName(booking?.fitness_class)
                                  )}
                                </h3>
                                <div className="p-4 pt-1">
                                  <p className="text-sm text-gray-600 flex gap-2 items-start pt-1">
                                    <span className=" flex items-center gap-1 font-semibold">
                                      <InfoCircleOutlined className="font-semibold" />

                                      <span>Booking ID:</span>
                                    </span>
                                    <span>{booking?.id}</span>
                                  </p>
                                  <p className="text-sm text-gray-600 flex gap-2 items-start pt-1">
                                    <span className=" flex items-center gap-1 font-semibold">
                                      <UserAddOutlined className="font-semibold" />

                                      <span>Instructor:</span>
                                    </span>
                                    <span>
                                      {" "}
                                      {isClassLoading ? (
                                        <Skeleton.Input active size="small" />
                                      ) : (
                                        getInsName(booking?.fitness_class)
                                      )}
                                    </span>
                                  </p>
                                  <p className="text-sm text-gray-600 flex gap-2 items-start py-1">
                                    <span className=" flex items-center gap-1 font-semibold">
                                      <FieldTimeOutlined className="font-semibold" />

                                      <span>Bookeing Date:</span>
                                    </span>
                                    <span>
                                      {new Date(
                                        booking?.booking_date
                                      ).toLocaleString()}
                                    </span>
                                  </p>
                                  {/* <p className=" text-justify mt-3 text-sm">{classData?.description}</p> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ),
    },
    {
      key: "edit",
      label: "Edit Profile",
      children: (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Form
            form={form}
            initialValues={profileData}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            {/* Username Field */}
            {/* <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Username"
                className="h-12"
              />
            </Form.Item> */}

            {/* First Name Field */}
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please enter your first name!" },
              ]}
            >
              <Input
                prefix={<IdcardOutlined className="text-gray-400" />}
                placeholder="First Name"
                className="h-12"
              />
            </Form.Item>

            {/* Last Name Field */}
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please enter your last name!" },
              ]}
            >
              <Input
                prefix={<IdcardOutlined className="text-gray-400" />}
                placeholder="Last Name"
                className="h-12"
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Email Address"
                className="h-12"
              />
            </Form.Item>

            {/* Password Field */}
            {/* <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter new password"
                className="h-12"
              />
            </Form.Item> */}

            {/* User Type Select Field */}
            <Form.Item
              name="userType"
              label="User Type"
              rules={[
                { required: true, message: "Please select your user type!" },
              ]}
            >
              <Select
                placeholder="Select User Type"
                className="h-12"
                suffixIcon={<UserOutlined className="text-gray-400" />}
                disabled
              >
                <Option value="member">Member</Option>
                <Option value="staff">Staff</Option>
              </Select>
            </Form.Item>

            {/* Save Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="bg-blue-600 hover:bg-blue-700"
                loading={editLoading}
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className="py-16 bg-gray-50 pt-28">
      <div className="max-w-3xl mx-auto px-4">
        {/* <h1 className="text-2xl font-bold mb-8 text-center">Profile</h1> */}
        {isUserLoading ? (
          <div className=" flex h-[50vh] items-center justify-center">
            <Spin size="large" />
          </div>
        ) : isUserError ? (
          <div className="bg-red-200 p-4 rounded-md font-semibold text-center">
            <span>Failed to load user data. Please try again later.</span>
          </div>
        ) : (
          <Tabs defaultActiveKey="view" items={tabItems} centered />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

import { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { toast } from "react-toastify";

const { Option } = Select;

const SignUpPage = () => {
  const [register, { isLoading, isError, error, isSuccess, data }] =
    useRegisterMutation();
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // setLoading(true);
    // console.log("Form values:", values);

    try {
      const userInfo = {
        username: values?.username,
        first_name: values?.firstName,
        email: values?.email,
        last_name: values?.lastName,
        password: values?.password,
        confirm_password: values?.confirmPassword,
        user_type: values?.userType,
      };

      // Call the register function (assuming it returns a promise)
      await register(userInfo);
    } catch (error) {
      // console.log("🚀 ~ onFinishFailed ~ error:", error);

      // Show the error message in a toast
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    // console.log("Error", error?.data?.error);
    if (isError) {
      toast.error(error?.data?.error);
    }
  }, [isLoading, error, isError, data]);

  useEffect(() => {
    if (isSuccess) {
      if (data?.username?.[0] === "A user with that username already exists.") {
        toast.error("A user with that username already exists.");
        return;
      }
      toast.success(
        "Registration successful! A confirmation email has been sent to your email address."
      );
      navigate("/sign-in");
    }
  }, [isSuccess, data, navigate]);

  const onFinishFailed = async (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-28 pb-10 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-4xl font-bold mb-6 text-center">Register</h3>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Username Field */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Username"
              className="h-12"
            />
          </Form.Item>

          {/* First Name Field */}
          <Form.Item
            name="firstName"
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
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="h-12"
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirm Password"
              className="h-12"
            />
          </Form.Item>

          {/* User Type Select Field */}
          <Form.Item
            name="userType"
            rules={[
              { required: true, message: "Please select your user type!" },
            ]}
          >
            <Select
              placeholder="Select User Type"
              className="h-12"
              suffixIcon={<UserOutlined className="text-gray-400" />}
            >
              <Option value="member">Member</Option>
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>

          {/* Sign Up Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        {/* Additional Links */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <NavLink to="/sign-in" className="text-blue-600 hover:underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

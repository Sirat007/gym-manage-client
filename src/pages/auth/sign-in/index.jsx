/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router";
import {
  useLazyLogoutQuery,
  useLoginMutation,
  useLogoutQuery,
} from "../../../redux/features/auth/authApi";
import { toast } from "react-toastify";
import { setUser } from "../../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [login, { isError, error, isSuccess, data, isLoading }] =
    useLoginMutation();
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    try {
      const userInfo = {
        username: values?.username,
        password: values?.password,
      };

      // Call the register function (assuming it returns a promise)
      await login(userInfo);
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
      if (data?.error) {
        if (data?.error == "Invalid Credential") {
          toast.error("Invalid Credential");
        } else {
          toast.error("Failed to sign in");
        }
        return;
      }
      console.log("data", data);
      dispatch(
        setUser({ user: { user_id: data?.user_id }, token: data?.token })
      );
      toast.success("Login successful!");
      navigate("/");
    }
  }, [isSuccess, data, navigate, dispatch]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    // message.error("Please fill in all fields correctly.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-4xl font-bold mb-6 text-center">Login</h3>
        <Form
          name="signin"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Email Field */}
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please enter your username!" },
              // { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Username"
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

          {/* Sign In Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        {/* Additional Links */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <NavLink to="/sign-up" className="text-blue-600 hover:underline">
              Register
            </NavLink>
          </p>
          <p className="text-gray-600">
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

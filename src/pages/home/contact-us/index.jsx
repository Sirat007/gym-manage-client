import { Form, Input, Button, message } from "antd";
import { MailOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";

const ContactUs = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Thank you for contacting us! We'll get back to you soon.");
    form.resetFields();
  };

  return (
    <div className="bg-blue-600 text-white py-16">
      <div className=" max-w-7xl mx-auto px-4">
        <h5 className="text-2xl font-semibold text-white mb-4">Contact Us</h5>
        <hr className=" w-20 mt-2 bg-white h-1" />
      </div>
      <div className="max-w-7xl mx-auto grid px-4 grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Left Side: Form Card */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Form form={form} onFinish={onFinish} layout="vertical">
            {/* Name Field */}
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Your Name"
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
                placeholder="Your Email"
                className="h-12"
              />
            </Form.Item>

            {/* Message Field */}
            <Form.Item
              name="message"
              rules={[
                { required: true, message: "Please enter your message!" },
              ]}
            >
              <Input.TextArea
                prefix={<MessageOutlined className="text-gray-400" />}
                placeholder="Your Message"
                rows={2}
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center space-y-6">
          <h4 className="text-xl font-bold">We're Here to Help!</h4>
          <p className="text-md">
            Whether you have questions about our services, need technical
            support, or just want to say hello, we're always ready to assist
            you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="border border-white w-10 h-10 flex items-center justify-center p-4 rounded-full">
                <MailOutlined className="text-white text-lg" />
              </div>
              <div>
                <h4 className="text-md font-semibold">Email Us</h4>
                <p className="text-gray-200">support@pulsepoint.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="border border-white w-10 h-10 flex items-center justify-center p-4 rounded-full">
                <MessageOutlined className="text-white text-lg" />
              </div>
              <div>
                <h4 className="text-md font-semibold">Chat with Us</h4>
                <p className="text-gray-200">Available 24/7</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="border border-white w-10 h-10 flex items-center justify-center p-4 rounded-full">
                <UserOutlined className="text-white text-lg" />
              </div>
              <div>
                <h4 className="text-md font-semibold">Visit Us</h4>
                <p className="text-gray-200">123 Fitness St, Gym City</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

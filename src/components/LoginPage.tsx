import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../assets/logo/QuickChat.png";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [adminLoginForm] = Form.useForm();

  const submitLoginForm = async (values: any) => {
    try {
      const response = await axiosInstance.post("/admin/login", values);
      message.success("Logged in successfully!");
      console.log(response);
      navigate("mainscreen/dashboard");

      localStorage.setItem("quickChatAccessToken", response?.data?.token);
    } catch (err: any) {
      console.log(err);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main login container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header section with logo */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src={Logo}
                alt="Quickchat"
                className="w-32 h-14 filter brightness-0 invert"
              />
            </div>
            <h1 className="text-white text-xl font-semibold">Admin Portal</h1>
            <p className="text-blue-100 text-sm mt-1">
              Welcome back! Please sign in to continue
            </p>
          </div>

          {/* Form section */}
          <div className="p-8">
            <Form
              layout="vertical"
              form={adminLoginForm}
              onFinish={submitLoginForm}
              size="large"
              className="space-y-2"
            >
              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    Phone Number
                  </span>
                }
                name="number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^\d+$/,
                    message: "Please enter a valid phone number!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Enter your phone number"
                  className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Password</span>
                }
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                  className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500 transition-colors"
                />
              </Form.Item>

              <Form.Item className="mb-0 pt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none rounded-lg font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                  loading={false}
                >
                  Sign In to Dashboard
                </Button>
              </Form.Item>
            </Form>

            {/* Additional features */}
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                Forgot your password?
              </a>
            </div>

            {/* Security notice */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-amber-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    <strong className="font-medium">Security Notice:</strong>{" "}
                    This is an admin portal. Only authorized personnel should
                    access this system.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>© 2024 QuickChat. All rights reserved.</p>
              <p className="mt-1">Secure admin authentication system</p>
            </div>
          </div>
        </div>

        {/* Additional decorative element */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full opacity-20 blur-2xl"></div>
      </div>
    </div>
  );
};

export default LoginPage;

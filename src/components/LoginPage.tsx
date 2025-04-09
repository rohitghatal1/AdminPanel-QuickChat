import { Button, Form, Input, message } from "antd";
import Logo from "../assets/logo/QuickChat.png";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [adminLoginForm] = Form.useForm();

  const submitLoginForm = async (values: any) => {
    try {
      const response = await axiosInstance.post("/api/admin/login", values);
      message.success("Logged in successfully!");
      navigate("mainscreen/dashboard");
      localStorage.setItem("quickChatAccessToken", response?.data?.accessToken);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[30rem]">
        <div className="w-full flex items-center justify-center py-1">
          <img src={Logo} alt="Quickchat" className="w-40 h-16" />
        </div>

        <div className="rounded-md border border-gray-300 p-4 shadow-md">
          <Form
            layout="vertical"
            form={adminLoginForm}
            onFinish={submitLoginForm}
          >
            <Form.Item label="Number" name="number">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={() => adminLoginForm.submit()}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

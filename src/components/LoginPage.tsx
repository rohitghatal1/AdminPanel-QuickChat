import { Button, Form, Input } from "antd";
import Logo from "../assets/logo/QuickChat.png";
import axiosInstance from "../utils/axiosInstance";

const LoginPage: React.FC = () => {
  const [adminLoginForm] = Form.useForm();

  const submitLoginForm = async (values: any) => {
    try {
      await axiosInstance.post("/admin/login", values);
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
            <Form.Item label="Username">
              <Input />
            </Form.Item>

            <Form.Item label="Password">
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary">Login</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

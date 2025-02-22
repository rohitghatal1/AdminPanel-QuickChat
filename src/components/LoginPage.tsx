import { Form, Input } from "antd";

const LoginPage: React.FC = () => {
  const [adminLoginForm] = Form.useForm();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[40rem]">
        <h2 className="text-lg py-2 text-center">Admin Login Page</h2>
        <div className="rounded-md border border-gray-300 p-4 shadow-md">
          <Form layout="vertical" form={adminLoginForm}>
            <Form.Item label="Username">
              <Input />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { Form, Input } from "antd";

const LoginPage: React.FC = () => {
  return (
    <div className="">
      <div>
        <h2>Admin Login Page</h2>
        <div>
          <Form>
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

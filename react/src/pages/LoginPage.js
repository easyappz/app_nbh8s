import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await loginApi(values.email, values.password);
      message.success('Вход выполнен успешно!');
      login(data.access, data.user);
      navigate('/profile');
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.non_field_errors?.[0] || 
                          'Неверный email или пароль';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/LoginPage.js" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card data-easytag="id2-react/src/pages/LoginPage.js" className="w-full max-w-md shadow-xl">
        <Title data-easytag="id3-react/src/pages/LoginPage.js" level={2} className="text-center mb-6">
          Вход
        </Title>
        <Form
          data-easytag="id4-react/src/pages/LoginPage.js"
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            data-easytag="id5-react/src/pages/LoginPage.js"
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' },
            ]}
          >
            <Input
              data-easytag="id6-react/src/pages/LoginPage.js"
              prefix={<MailOutlined />}
              placeholder="example@mail.com"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id7-react/src/pages/LoginPage.js"
            name="password"
            label="Пароль"
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input.Password
              data-easytag="id8-react/src/pages/LoginPage.js"
              prefix={<LockOutlined />}
              placeholder="Введите пароль"
            />
          </Form.Item>

          <Form.Item data-easytag="id9-react/src/pages/LoginPage.js">
            <Button
              data-easytag="id10-react/src/pages/LoginPage.js"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Войти
            </Button>
          </Form.Item>

          <div data-easytag="id11-react/src/pages/LoginPage.js" className="text-center">
            Нет аккаунта? <Link data-easytag="id12-react/src/pages/LoginPage.js" to="/register">Зарегистрироваться</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;

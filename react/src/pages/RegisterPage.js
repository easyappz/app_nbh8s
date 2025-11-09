import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await register(
        values.email,
        values.firstName,
        values.lastName,
        values.password
      );
      message.success('Регистрация прошла успешно!');
      login(data.access, data.user);
      navigate('/profile');
    } catch (error) {
      const errorMessage = error.response?.data?.email?.[0] || 
                          error.response?.data?.password?.[0] || 
                          error.response?.data?.detail || 
                          'Ошибка регистрации';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/RegisterPage.js" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card data-easytag="id2-react/src/pages/RegisterPage.js" className="w-full max-w-md shadow-xl">
        <Title data-easytag="id3-react/src/pages/RegisterPage.js" level={2} className="text-center mb-6">
          Регистрация
        </Title>
        <Form
          data-easytag="id4-react/src/pages/RegisterPage.js"
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            data-easytag="id5-react/src/pages/RegisterPage.js"
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' },
            ]}
          >
            <Input
              data-easytag="id6-react/src/pages/RegisterPage.js"
              prefix={<MailOutlined />}
              placeholder="example@mail.com"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id7-react/src/pages/RegisterPage.js"
            name="firstName"
            label="Имя"
            rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
          >
            <Input
              data-easytag="id8-react/src/pages/RegisterPage.js"
              prefix={<UserOutlined />}
              placeholder="Иван"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id9-react/src/pages/RegisterPage.js"
            name="lastName"
            label="Фамилия"
            rules={[{ required: true, message: 'Пожалуйста, введите фамилию!' }]}
          >
            <Input
              data-easytag="id10-react/src/pages/RegisterPage.js"
              prefix={<UserOutlined />}
              placeholder="Иванов"
            />
          </Form.Item>

          <Form.Item
            data-easytag="id11-react/src/pages/RegisterPage.js"
            name="password"
            label="Пароль"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
              { min: 8, message: 'Пароль должен содержать минимум 8 символов!' },
              {
                pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
                message: 'Пароль должен содержать хотя бы одну букву и одну цифру!',
              },
            ]}
          >
            <Input.Password
              data-easytag="id12-react/src/pages/RegisterPage.js"
              prefix={<LockOutlined />}
              placeholder="Введите пароль"
            />
          </Form.Item>

          <Form.Item data-easytag="id13-react/src/pages/RegisterPage.js">
            <Button
              data-easytag="id14-react/src/pages/RegisterPage.js"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div data-easytag="id15-react/src/pages/RegisterPage.js" className="text-center">
            Уже есть аккаунт? <Link data-easytag="id16-react/src/pages/RegisterPage.js" to="/login">Войти</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;

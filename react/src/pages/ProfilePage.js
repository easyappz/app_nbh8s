import React, { useState } from 'react';
import { Card, Descriptions, Button, Form, Input, Space, message, Typography } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    form.setFieldsValue({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      const updatedUser = await updateProfile(values);
      updateUser(updatedUser);
      message.success('Профиль успешно обновлен!');
      setIsEditing(false);
    } catch (error) {
      const errorMessage = error.response?.data?.email?.[0] || 
                          error.response?.data?.detail || 
                          'Ошибка обновления профиля';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    message.success('Вы вышли из системы');
    navigate('/login');
  };

  return (
    <div data-easytag="id1-react/src/pages/ProfilePage.js" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card
        data-easytag="id2-react/src/pages/ProfilePage.js"
        className="w-full max-w-2xl shadow-xl"
        title={
          <Title data-easytag="id3-react/src/pages/ProfilePage.js" level={2} className="mb-0">
            Профиль пользователя
          </Title>
        }
        extra={
          <Button
            data-easytag="id4-react/src/pages/ProfilePage.js"
            type="default"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            danger
          >
            Выйти
          </Button>
        }
      >
        {!isEditing ? (
          <div data-easytag="id5-react/src/pages/ProfilePage.js">
            <Descriptions data-easytag="id6-react/src/pages/ProfilePage.js" bordered column={1} size="middle">
              <Descriptions.Item data-easytag="id7-react/src/pages/ProfilePage.js" label="Email">
                {user?.email}
              </Descriptions.Item>
              <Descriptions.Item data-easytag="id8-react/src/pages/ProfilePage.js" label="Имя">
                {user?.first_name}
              </Descriptions.Item>
              <Descriptions.Item data-easytag="id9-react/src/pages/ProfilePage.js" label="Фамилия">
                {user?.last_name}
              </Descriptions.Item>
              <Descriptions.Item data-easytag="id10-react/src/pages/ProfilePage.js" label="Дата регистрации">
                {user?.date_joined ? new Date(user.date_joined).toLocaleDateString('ru-RU') : '-'}
              </Descriptions.Item>
            </Descriptions>
            <div data-easytag="id11-react/src/pages/ProfilePage.js" className="mt-4">
              <Button
                data-easytag="id12-react/src/pages/ProfilePage.js"
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
              >
                Редактировать профиль
              </Button>
            </div>
          </div>
        ) : (
          <Form
            data-easytag="id13-react/src/pages/ProfilePage.js"
            form={form}
            onFinish={handleSave}
            layout="vertical"
            size="large"
          >
            <Form.Item
              data-easytag="id14-react/src/pages/ProfilePage.js"
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Пожалуйста, введите email!' },
                { type: 'email', message: 'Введите корректный email!' },
              ]}
            >
              <Input data-easytag="id15-react/src/pages/ProfilePage.js" placeholder="example@mail.com" />
            </Form.Item>

            <Form.Item
              data-easytag="id16-react/src/pages/ProfilePage.js"
              name="first_name"
              label="Имя"
              rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
            >
              <Input data-easytag="id17-react/src/pages/ProfilePage.js" placeholder="Иван" />
            </Form.Item>

            <Form.Item
              data-easytag="id18-react/src/pages/ProfilePage.js"
              name="last_name"
              label="Фамилия"
              rules={[{ required: true, message: 'Пожалуйста, введите фамилию!' }]}
            >
              <Input data-easytag="id19-react/src/pages/ProfilePage.js" placeholder="Иванов" />
            </Form.Item>

            <Form.Item data-easytag="id20-react/src/pages/ProfilePage.js">
              <Space data-easytag="id21-react/src/pages/ProfilePage.js">
                <Button
                  data-easytag="id22-react/src/pages/ProfilePage.js"
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                >
                  Сохранить
                </Button>
                <Button
                  data-easytag="id23-react/src/pages/ProfilePage.js"
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                >
                  Отмена
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;

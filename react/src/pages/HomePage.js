import React from 'react';
import { Layout, Button, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <Content data-easytag="id1-react/src/pages/HomePage.js" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div data-easytag="id2-react/src/pages/HomePage.js" className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
        <Title data-easytag="id3-react/src/pages/HomePage.js" level={1} className="text-center text-blue-600 mb-4">
          Добро пожаловать!
        </Title>
        
        {isAuthenticated ? (
          <div data-easytag="id4-react/src/pages/HomePage.js" className="text-center">
            <Paragraph data-easytag="id5-react/src/pages/HomePage.js" className="text-lg mb-6">
              Привет, {user?.first_name} {user?.last_name}!
            </Paragraph>
            <Button
              data-easytag="id6-react/src/pages/HomePage.js"
              type="primary"
              size="large"
              onClick={() => navigate('/profile')}
            >
              Перейти в профиль
            </Button>
          </div>
        ) : (
          <div data-easytag="id7-react/src/pages/HomePage.js" className="text-center">
            <Paragraph data-easytag="id8-react/src/pages/HomePage.js" className="text-lg mb-6">
              Это ваше приложение для управления профилем. Пожалуйста, войдите или зарегистрируйтесь.
            </Paragraph>
            <Space data-easytag="id9-react/src/pages/HomePage.js" size="large">
              <Button
                data-easytag="id10-react/src/pages/HomePage.js"
                type="primary"
                size="large"
                onClick={() => navigate('/login')}
              >
                Войти
              </Button>
              <Button
                data-easytag="id11-react/src/pages/HomePage.js"
                size="large"
                onClick={() => navigate('/register')}
              >
                Регистрация
              </Button>
            </Space>
          </div>
        )}
      </div>
    </Content>
  );
};

export default HomePage;

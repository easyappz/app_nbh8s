import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';
import ErrorBoundary from './ErrorBoundary';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

const { Header, Content } = Layout;

const AppContent = () => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (window.handleRoutes) {
      window.handleRoutes(['/', '/register', '/login', '/profile']);
    }
  }, []);

  const menuItems = isAuthenticated
    ? [
        {
          key: 'home',
          icon: <HomeOutlined />,
          label: <Link to="/">Главная</Link>,
        },
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: <Link to="/profile">Профиль</Link>,
        },
      ]
    : [
        {
          key: 'home',
          icon: <HomeOutlined />,
          label: <Link to="/">Главная</Link>,
        },
        {
          key: 'login',
          icon: <LoginOutlined />,
          label: <Link to="/login">Вход</Link>,
        },
        {
          key: 'register',
          icon: <UserAddOutlined />,
          label: <Link to="/register">Регистрация</Link>,
        },
      ];

  return (
    <Layout data-easytag="id1-react/src/App.js" className="min-h-screen">
      <Header data-easytag="id2-react/src/App.js" className="bg-blue-600">
        <Menu
          data-easytag="id3-react/src/App.js"
          theme="dark"
          mode="horizontal"
          items={menuItems}
          className="bg-blue-600"
        />
      </Header>
      <Content data-easytag="id4-react/src/App.js">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Content>
    </Layout>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

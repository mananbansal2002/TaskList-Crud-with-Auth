import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const AppRoutes = ({
  isAuthenticated,
  token,
  setToken,
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();

  const logout = () => {
    setIsAuthenticated(false);
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <TaskList
                token={token}
                logout={logout}
              />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/login'
          element={
            isAuthenticated ? (
              <Navigate to='/' />
            ) : (
              <Login
                setToken={setToken}
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          }
        />
        <Route
          path='/tasks/new'
          element={
            isAuthenticated ? (
              <TaskForm token={token} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/tasks/edit/:id'
          element={
            isAuthenticated ? (
              <TaskForm token={token} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='*'
          element={<Navigate to='/' />}
        />
      </Routes>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) setIsAuthenticated(true);
  }, [token]);

  return (
    <Router>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        token={token}
        setToken={setToken}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
};

export default App;

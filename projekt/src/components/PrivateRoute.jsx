import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    const urlRefreshToken = params.get('refreshToken');
    const urlUserId = params.get('userId');
    const urlUserName = params.get('userName');
    const urlUserEmail = params.get('userEmail');
    const urlUserRole = params.get('role');

    if (urlToken && urlRefreshToken) {
      localStorage.setItem('token', urlToken);
      localStorage.setItem('refreshToken', urlRefreshToken);
      if (urlUserId) localStorage.setItem('userId', urlUserId);
      if (urlUserName) localStorage.setItem('userName', urlUserName);
      if (urlUserEmail) localStorage.setItem('userEmail', urlUserEmail);
      if (urlUserRole) localStorage.setItem('userRole', urlUserRole);

     
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (token) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else if (refreshToken) {
        try {
          const res = await axios.post(
            'http://localhost:3002/token/refresh',
            { refreshToken },
            { withCredentials: true }
          );

          const newToken = res.data.token;
          localStorage.setItem('token', newToken);
          setIsAuthenticated(true);
          setIsLoading(false);
        } catch (err) {
          console.error('Refresh token failed:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('userRole');
          setIsAuthenticated(false);
          setIsLoading(false);
          navigate('/login', { replace: true });
        }
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/login', { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

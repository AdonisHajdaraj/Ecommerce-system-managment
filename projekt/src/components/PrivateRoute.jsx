import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (token) {
        // Token ekziston, jemi të loguar
        setIsAuthenticated(true);
        setIsLoading(false);
      } else if (refreshToken) {
        // Nuk kemi access token, por kemi refresh token, provojmë rifreskimin
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

          // Nëse refresh token nuk funksionon, fshijmë tokenat dhe ridrejtojmë në login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          setIsAuthenticated(false);
          setIsLoading(false);

          navigate('/login', { replace: true });
        }
      } else {
        // As token dhe as refresh token nuk ekzistojnë
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

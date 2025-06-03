import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        // Nëse ke endpoint backend për logout, dërgo kërkesën për të fshirë refresh tokenin nga DB
        await axios.post(
          'http://localhost:3002/logout',
          { refreshToken },
          { withCredentials: true }
        );
      }

      // Fshij tokenat dhe të dhënat nga localStorage
      localStorage.removeItem('token');          // access token
      localStorage.removeItem('refreshToken');   // refresh token
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');

      // Ridrejto në login me replace për të parandaluar kthimin mbrapa
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Mund të shtosh njoftime për përdoruesin në rast gabimi
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>You are about to log out</h2>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

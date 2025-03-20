import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
    

      // Clear all user data from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');

      // Redirect user to the login page after logout
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // You might want to handle errors, e.g., display a message or redirect to an error page
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

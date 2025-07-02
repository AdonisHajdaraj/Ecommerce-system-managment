import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const validate = ({ email, password }) => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post('http://localhost:3002/v1/signin', values);
        const { token, refreshToken, userId, userName, userEmail, role } = res.data;

        if (token && refreshToken) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userRole', role);
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          navigate(role === 'admin' ? '/dashboard' : '/user-dashboard');
        } else {
          setServerError('Authentication failed. Please check your credentials.');
        }
      } catch (err) {
        console.error('Login error:', err);
        setServerError(err.response?.data?.message || 'An error occurred. Please try again.');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3002/auth/google'; // Ndrysho sipas backend-it
  };

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="login-card shadow p-4 rounded-4 bg-white">
        <h2 className="text-center mb-4 fw-bold text-primary">Kyçu në llogarinë tënde</h2>

        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Shkruaj email-in"
              autoComplete="username"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">Fjalëkalimi</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Shkruaj fjalëkalimin"
              autoComplete="current-password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold py-2 mb-3">
            Kyçu
          </button>
        </form>

        <div className="text-center mb-3 text-muted">— ose —</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold py-2"
          type="button"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            style={{ width: 24, height: 24 }}
          />
          Kyçu me Google
        </button>

        <div className="mt-4 text-center">
          <p className="mb-0">
            Nuk ke llogari?{' '}
            <button className="btn btn-link p-0 fw-semibold" onClick={() => navigate('/signup')}>
              Krijo një llogari
            </button>
          </p>
        </div>
      </div>

      {/* Shto stilin CSS direkt këtu */}
      <style>{`
        .login-wrapper {
          background: #f8f9fa;
        }
        .login-card {
          width: 380px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: box-shadow 0.3s ease;
        }
        .login-card:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .btn-outline-danger:hover {
          background-color: #ea4335;
          color: white;
          border-color: #ea4335;
        }
      `}</style>
    </div>
  );
};

export default Login;

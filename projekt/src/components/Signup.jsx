import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Emri është i detyrueshëm.";
    if (!values.email) {
      errors.email = "Email është i detyrueshëm.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Email nuk është valid.";
    }
    if (!values.password) errors.password = "Fjalëkalimi është i detyrueshëm.";
    else if (values.password.length < 6) errors.password = "Fjalëkalimi duhet të ketë të paktën 6 karaktere.";
    return errors;
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const res = await axios.post('http://localhost:3002/v1/register', values);
        const { token, userId, userName, userEmail, role } = res.data;

        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('userRole', role);

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          navigate(role === 'admin' ? '/dashboard' : '/user-dashboard');
        }
      } catch (err) {
        console.error('Signup error:', err);
        setServerError(err.response?.data?.message || 'Ndodhi një gabim. Ju lutemi provoni përsëri.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="signup-wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="signup-card shadow p-4 rounded-4 bg-white" style={{ width: 380 }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Regjistrohu</h2>

        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3 form-floating">
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Emri"
              autoComplete="name"
            />
            <label htmlFor="name">Emri</label>
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3 form-floating">
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
              autoComplete="email"
            />
            <label htmlFor="email">Email</label>
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-4 form-floating">
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Fjalëkalimi"
              autoComplete="new-password"
            />
            <label htmlFor="password">Fjalëkalimi</label>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold py-2 mb-3"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Regjistrohu'
            )}
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="mb-0">
            Ke llogari?{' '}
            <button className="btn btn-link p-0 fw-semibold" onClick={() => navigate('/login')}>
              Kyçu këtu
            </button>
          </p>
        </div>

      </div>

      <style>{`
        .signup-wrapper {
          background: #f8f9fa;
        }
        .signup-card {
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: box-shadow 0.3s ease;
        }
        .signup-card:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default Signup;

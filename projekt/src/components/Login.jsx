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
        const { token, userId, userName, userEmail, role } = res.data;

        if (token) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userRole', role);
          localStorage.setItem('token', token);

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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-light">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4 text-primary">Kyçu</h2>

              {serverError && <div className="alert alert-danger">{serverError}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <label htmlFor="email">Email</label>
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <label htmlFor="password">Fjalëkalimi</label>
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="d-grid gap-2 mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">Kyçu</button>
                </div>
              </form>

              <div className="text-center mt-3">
                <p>Nuk ke një llogari? <button className="btn btn-link p-0" onClick={() => navigate('/signup')}>Krijo një llogari</button></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

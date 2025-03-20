import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
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
      try {
        const res = await axios.post('http://localhost:3002/v1/register', values);
        const { token, userId, userName, userEmail, role } = res.data;

        if (token) {
          // Ruaj të dhënat në localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('userRole', role);

         
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Ridrejto në dashboard
          navigate(role === 'admin' ? '/dashboard' : '/user-dashboard');
        }
      } catch (err) {
        console.error('Signup error:', err);
        setServerError(err.response?.data?.message || 'Ndodhi një gabim. Ju lutemi provoni përsëri.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-light">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4 text-primary">Regjistrohu</h2>

              {serverError && <div className="alert alert-danger">{serverError}</div>}

              <form onSubmit={handleSubmit}>
                {['name', 'email', 'password'].map(field => (
                  <div className="form-floating mb-3" key={field}>
                    <input
                      type={field === 'password' ? 'password' : 'text'}
                      className="form-control"
                      id={field}
                      name={field}
                      placeholder={field === 'name' ? 'Emri' : field === 'email' ? 'Email' : 'Fjalëkalimi'}
                      value={values[field]}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={field}>{field === 'name' ? 'Emri' : field === 'email' ? 'Email' : 'Fjalëkalimi'}</label>
                    {errors[field] && <div className="text-danger">{errors[field]}</div>}
                  </div>
                ))}
                <div className="d-grid gap-2 mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">Regjistrohu</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      console.log('Attempting login with:', { email });
      const res = await API.post('/auth/login', { email, password });
      console.log('Login response:', res.data);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        console.log('Token stored successfully');
        navigate('/');
      } else {
        setError('No token received from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error response:', err.response?.data);
      
      if (err.response?.status === 400) {
        setError(err.response.data.message || 'Invalid email or password');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.code === 'ECONNREFUSED') {
        setError('Cannot connect to server. Please check if backend is running.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className="auth-links">
        <p>Don't have an account? <a href="/register">Sign up here</a></p>
      </div>
    </div>
  );
}

export default Login;

// PrivateRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import API from '../api';

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log('No token found, redirecting to login');
        setIsValid(false);
        setLoading(false);
        return;
      }

      try {
        console.log('Validating token...');
        // Make a request to validate the token
        const response = await API.get('/auth/validate');
        console.log('Token validation successful:', response.data);
        setIsValid(true);
      } catch (error) {
        console.error('Token validation failed:', error);
        // Token is invalid or expired
        localStorage.removeItem('token');
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div className="spinner" style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '15px'
        }}></div>
        <div>Validating authentication...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isValid) {
    console.log('Token invalid, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('Token valid, rendering protected content');
  return children;
};

export default PrivateRoute;

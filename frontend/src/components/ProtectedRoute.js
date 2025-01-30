import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component to wrap routes that require authentication
const ProtectedRoute = ({ children }) => {
  // Retrieve the token from localStorage to check if the user is authenticated
  const token = localStorage.getItem('token');

  // If no token exists, redirect the user to the login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // If the token is present, allow the user to access the protected route
  return children;
};

export default ProtectedRoute;

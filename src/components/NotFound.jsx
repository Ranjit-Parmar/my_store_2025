import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    // Check if there's history to go back to
    if (location.key !== 'default') {
        navigate('/');
    } else {
        navigate(-1);
    }
  };

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Oops! The page you're looking for doesn't exist.</p>
      <button className="notfound-link" onClick={handleGoBack}>
        Go back
      </button>
    </div>
  );
};

export default NotFound;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="logo-container" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
      <img src="/images/Main.jpg" alt="Bytesfer Solutions" className="logo" />
    </div>
  );
};

export default Logo;

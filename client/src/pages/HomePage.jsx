// filepath: m:\Algo OJ\Algo OJ\client\src\pages\HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import SplitText from '../components/SplitText';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="welcome-box">
        <SplitText text="Welcome to Algo OJ" className="welcome-title" />
        <p>Your platform for competitive programming. Please login or register to continue.</p>
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
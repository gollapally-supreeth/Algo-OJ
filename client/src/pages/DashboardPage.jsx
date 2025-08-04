// filepath: m:\Algo OJ\Algo OJ\client\src\pages\DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2">Welcome! You are logged in.</p>
      <button 
        onClick={handleLogout} 
        className="px-4 py-2 mt-6 font-bold text-white bg-red-500 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
// filepath: m:\Algo OJ\Algo OJ\client\src\App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AddProblemPage from './pages/AddProblemPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* User Routes */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/add-problem" element={<AddProblemPage />} />
    </Routes>
  );
}

export default App;
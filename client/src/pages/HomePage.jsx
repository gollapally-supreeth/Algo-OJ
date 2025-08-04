// filepath: m:\Algo OJ\Algo OJ\client\src\pages\HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="mb-8 text-4xl font-bold">Welcome to Algo OJ</h1>
      <div className="space-x-4">
        <Link to="/login" className="px-6 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Login
        </Link>
        <Link to="/register" className="px-6 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
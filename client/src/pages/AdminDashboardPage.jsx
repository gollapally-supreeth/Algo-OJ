// filepath: m:\Algo OJ\Algo OJ\client\src\pages\AdminDashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <div className="space-y-4">
        <Link to="/admin/add-problem" className="block w-full p-4 text-center text-white bg-blue-500 rounded hover:bg-blue-700">
          Add New Problem
        </Link>
        {/* We will add a link to view all problems later */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
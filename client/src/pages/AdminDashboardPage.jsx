import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import problemService from '../services/problemService';

const AdminDashboardPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProblems = async () => {
    try {
      const data = await problemService.getProblems();
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      try {
        await problemService.deleteProblem(id);
        // Refetch problems or filter state to update UI
        setProblems(problems.filter((p) => p._id !== id));
      } catch (err) {
        setError('Failed to delete problem.');
      }
    }
  };

  return (
    <div className="container p-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/add-problem" className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">
          Add New Problem
        </Link>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">All Problems</h2>
        {loading && <p>Loading problems...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {problems.map((problem) => (
              <div key={problem._id} className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="text-xl font-bold">{problem.title}</h3>
                  <span className={`px-2 py-1 text-sm font-semibold rounded-full ${
                    problem.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="space-x-2">
                  {/* We will add functionality for this button later */}
                  <button className="px-3 py-1 text-white bg-blue-500 rounded">View</button>
                  <Link 
                    to={`/admin/edit-problem/${problem._id}`}
                    className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(problem._id)}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
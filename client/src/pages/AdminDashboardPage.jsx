import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import problemService from '../services/problemService';
import './AdminDashboardPage.css';

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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <Link to="/admin/add-problem" className="btn btn-add">
          Add New Problem
        </Link>
      </div>

      <div className="dashboard-content">
        <h2 className="content-title">All Problems</h2>
        {loading && <p className="loading-text">Loading problems...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && (
          <div className="table-wrapper">
            <table className="problems-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Difficulty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <tr key={problem._id}>
                    <td>{problem.title}</td>
                    <td>
                      <span className={`difficulty-badge difficulty-${problem.difficulty?.toLowerCase()}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/problems/${problem._id}`} className="btn btn-view">View</Link>
                        <Link 
                          to={`/admin/edit-problem/${problem._id}`}
                          className="btn btn-edit"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(problem._id)}
                          className="btn btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
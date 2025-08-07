// filepath: m:\Algo OJ\Algo OJ\client\src\pages\AddProblemPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import problemService from '../services/problemService';
import './AddProblemPage.css';

const AddProblemPage = () => {
  const [title, setTitle] = useState('Two Sum');
  const [description, setDescription] = useState(
`Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
Input: nums = [3,2,4], target = 6
Output: [1,2]

**Example 3:**
Input: nums = [3,3], target = 6
Output: [0,1]

**Constraints:**
- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- Only one valid answer exists.`
  );
  const [difficulty, setDifficulty] = useState('Easy');
  const [testCases, setTestCases] = useState(JSON.stringify([
    { "input": "nums = [2,7,11,15], target = 9", "output": "[0,1]" },
    { "input": "nums = [3,2,4], target = 6", "output": "[1,2]" },
    { "input": "nums = [3,3], target = 6", "output": "[0,1]" }
  ], null, 2));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!testCases.trim()) {
      setError('Test cases cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      const parsedTestCases = JSON.parse(testCases);
      const newProblem = { title, description, difficulty, testCases: parsedTestCases };
      
      await problemService.addProblem(newProblem);
      if (isMounted.current) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      if (isMounted.current) {
        // Provide more specific feedback from the server if available
        const serverError = err.response?.data?.message;
        const jsonError = err instanceof SyntaxError ? 'Invalid JSON format in Test Cases.' : '';
        setError(serverError || jsonError || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add New Problem</h1>
      <form onSubmit={handleSubmit} className="problem-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="testCases">Test Cases (JSON format)</label>
          <textarea
            id="testCases"
            rows="10"
            value={testCases}
            onChange={(e) => setTestCases(e.target.value)}
            required
          ></textarea>
          <p className="json-hint">
            Provide an array of objects in JSON format.
          </p>
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)} className="btn btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn btn-submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Problem'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProblemPage;
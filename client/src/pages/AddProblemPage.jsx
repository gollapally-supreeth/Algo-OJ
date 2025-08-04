// filepath: m:\Algo OJ\Algo OJ\client\src\pages\AddProblemPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import problemService from '../services/problemService';

const AddProblemPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTestCaseChange = (index, event) => {
    const values = [...testCases];
    values[index][event.target.name] = event.target.value;
    setTestCases(values);
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const handleRemoveTestCase = (index) => {
    const values = [...testCases];
    values.splice(index, 1);
    setTestCases(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await problemService.createProblem({ title, description, difficulty, testCases });
      navigate('/admin/dashboard'); // Redirect to dashboard after success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create problem');
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Add New Problem</h1>
      {error && <p className="p-2 mb-4 text-white bg-red-500 rounded">{error}</p>}
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
        {/* Title, Description, Difficulty fields */}
        <div className="mb-4">
          <label className="block mb-1 font-bold">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" rows="5" required></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 border rounded">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {/* Test Cases Section */}
        <h2 className="mt-6 mb-2 text-xl font-bold">Test Cases</h2>
        {testCases.map((testCase, index) => (
          <div key={index} className="p-3 mb-4 border rounded">
            <h3 className="font-semibold">Test Case {index + 1}</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block mb-1 font-bold">Input</label>
                <textarea name="input" value={testCase.input} onChange={e => handleTestCaseChange(index, e)} className="w-full p-2 border rounded" required></textarea>
              </div>
              <div>
                <label className="block mb-1 font-bold">Output</label>
                <textarea name="output" value={testCase.output} onChange={e => handleTestCaseChange(index, e)} className="w-full p-2 border rounded" required></textarea>
              </div>
            </div>
            <button type="button" onClick={() => handleRemoveTestCase(index)} className="px-3 py-1 mt-2 text-white bg-red-500 rounded">Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddTestCase} className="px-3 py-1 mr-4 text-white bg-blue-500 rounded">Add Test Case</button>
        
        <button type="submit" className="px-4 py-2 mt-6 font-bold text-white bg-green-600 rounded hover:bg-green-700">Create Problem</button>
      </form>
    </div>
  );
};

export default AddProblemPage;
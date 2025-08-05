// filepath: m:\Algo OJ\Algo OJ\client\src\services\problemService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/problems/';

// Get the user from local storage to access the token
const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Create a new problem (Admin only)
const createProblem = async (problemData) => {
  const user = getUser();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.post(API_URL, problemData, config);
  return response.data;
};

// Get all problems
const getProblems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a problem (Admin only)
const deleteProblem = async (id) => {
  const user = getUser();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};
// Get a single problem by ID
const getProblemById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Update a problem (Admin only)
const updateProblem = async (id, problemData) => {
  const user = getUser();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.put(API_URL + id, problemData, config);
  return response.data;
};

const problemService = {
  createProblem,
  getProblems,
  deleteProblem,
  getProblemById,
  updateProblem,
};

export default problemService;
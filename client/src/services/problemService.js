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

const problemService = {
  createProblem,
  getProblems,
};

export default problemService;
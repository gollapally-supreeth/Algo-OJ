// filepath: m:\Algo OJ\Algo OJ\server\src\controllers\problemController.js
import Problem from '../models/Problem.js';

// @desc    Create a problem
// @route   POST /api/problems
// @access  Private/Admin
const createProblem = async (req, res) => {
  try {
    const problem = new Problem(req.body);
    const createdProblem = await problem.save();
    res.status(201).json(createdProblem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all problems
// @route   GET /api/problems
// @access  Public
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a problem
// @route   DELETE /api/problems/:id
// @access  Private/Admin
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (problem) {
      await problem.deleteOne();
      res.json({ message: 'Problem removed' });
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single problem
// @route   GET /api/problems/:id
// @access  Public
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (problem) {
      res.json(problem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a problem
// @route   PUT /api/problems/:id
// @access  Private/Admin
const updateProblem = async (req, res) => {
  const { title, description, difficulty, testCases } = req.body;

  try {
    const problem = await Problem.findById(req.params.id);

    if (problem) {
      problem.title = title || problem.title;
      problem.description = description || problem.description;
      problem.difficulty = difficulty || problem.difficulty;
      problem.testCases = testCases || problem.testCases;

      const updatedProblem = await problem.save();
      res.json(updatedProblem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createProblem, getProblems, getProblemById, deleteProblem, updateProblem};
// filepath: m:\Algo OJ\Algo OJ\server\src\routes\problemRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { 
  createProblem, 
  getProblems, 
  getProblemById,
  deleteProblem,
  updateProblem
} from '../controllers/problemController.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createProblem)
  .get(getProblems);
  
router.route('/:id')
  .get(getProblemById)
  .delete(protect, admin, deleteProblem)
  .put(protect, admin, updateProblem);

export default router;
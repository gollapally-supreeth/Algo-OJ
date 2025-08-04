// filepath: m:\Algo OJ\Algo OJ\server\src\models\Problem.js
import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  testCases: [testCaseSchema],
}, { timestamps: true });

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;
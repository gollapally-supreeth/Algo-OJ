// filepath: m:\Algo OJ\Algo OJ\server\src\server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import problemRoutes from './routes/problemRoutes.js';


dotenv.config();

// Connect to Database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);


app.get('/', (req, res) => {
  res.send('Algo OJ Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
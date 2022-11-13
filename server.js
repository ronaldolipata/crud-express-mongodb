import express from 'express';
import process from 'node:process';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import { userInfo } from 'node:os';

const app = express();
// Use PORT from .env file if exists. Otherwise, use PORT 3000
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configure .env file to use
dotenv.config();
mongoose.connect(process.env.DB_URL);

mongoose.connection.on('open', () => {
  console.log('Connected');
});

app.get('/users', async (req, res) => {
  // Use limit and offset queries if exists. Otherwise, use default values.
  const limit = req.query.limit || 3;
  const offset = req.query.offset || 0;

  try {
    const data = await User.aggregate([
      { $limit: parseInt(limit) },
      { $skip: parseInt(offset) },
    ]);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post('/users', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Create new User from request body
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});

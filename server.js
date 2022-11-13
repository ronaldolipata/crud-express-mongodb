import express from 'express';
import process from 'node:process';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    Message: 'Hello World!',
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});

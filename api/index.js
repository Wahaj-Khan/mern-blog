import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose
.connect(process.env.MONGODB_URI)
.then(() => { console.log('Connected to MongoDB') })
.catch((err) => { console.log('Failed to connect to MongoDB', err) });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api/user', userRouter); 
app.use('/api/auth', authRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  if(error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} "${value}" already exists`;
  }
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
   }); 
})
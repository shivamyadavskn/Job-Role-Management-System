import express, { Application, RequestHandler } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import jobRolesRouter from './routes/jobroles';

const app: Application = express();

dotenv.config();

const mongoURI = process.env.MONGODB_URI || '';
console.log('mongoURI', mongoURI);
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser() as unknown as RequestHandler);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jobroles', jobRolesRouter);

export default app; 
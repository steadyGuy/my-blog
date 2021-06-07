import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './router';
import connection from './config/db';

dotenv.config();

// Midlware connecting
const app = express();

// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

router(app);

// turn on the server
const PORT = process.env.PORT || 3002;

connection.once('open', () => {
  console.log('Mongodb connection established successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

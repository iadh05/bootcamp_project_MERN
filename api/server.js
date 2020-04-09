import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';

import connectDB from './config/db.js';

//load routes
import bootcamps from './routes/bootcamps.js';
import errorHandler from './middleware/error.js';

const app = express();

//body parser
app.use(express.json());

app.use(morgan('dev'));

// load dotenv var
dotenv.config({ path: './.env' });

// connect database
connectDB();

//Mount Routes
app.use('/api/v1/bootcamps', bootcamps);

//error middleware
app.use(errorHandler);
// create server
let port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${port}!`.yellow.bold
  );
});

//Handle promise rejection

process.on('unhandledRejection', (err, promise) => {
  console.log('Error :', err.message);
  //Close server & exit process
  server.close(() => process.exit(1));
});

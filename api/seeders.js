import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import colors from 'colors';

//load env var
dotenv.config({ path: './.env' });

//load models
import Bootcamp from './models/Bootcamp.js';

//connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// read file
const bootcamp = JSON.parse(
  fs.readFileSync(`${process.cwd()}/_data/bootcamps.json`, 'utf-8')
);

//import data to DB

const importData = async () => {
  try {
    await Bootcamp.create(bootcamp);
    console.log('Data Imported ...'.green.inverse);
    process.exit();
  } catch (error) {
    console.log('error :', error);
  }
};

//delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Data Deleted ...'.red.inverse);
    process.exit();
  } catch (error) {
    console.log('error :', error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}

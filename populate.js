import {readFile} from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

//import connectDB from './db/connect.js';
//import Job from './models/Job.js';



import  mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url);
};


const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
      
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
     
    },

    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["fulltime", "part-time", "remote", "internship"],
      default: "fulltime",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        //await Job.deleteMany();
        const jsonProducts = JSON.parse(await readFile(new URL('./mock-data.json', import.meta.url)));
        await Job.create(jsonProducts);
        console.log('Success !!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}

start();
import express, { NextFunction, Request, Response } from 'express';
import "reflect-metadata";

// => using typeORM 
import { AppDataSource } from './library/sql/dataSource';

AppDataSource.initialize()
.then(()=> {
  console.log("Data source has been initialized");
})
.catch((e)=> {
  console.log("Error: Data source initialization", e);
})


// => importing route module
import dailyLogRoute from './route/dailyLog';
import subTaskRoute from './route/subTask';
import taskRoute from './route/task';
import userRoute from './route/user';



const app = express();
const PORT = 3000;

// => adding routes 
app.use("/user", userRoute);
app.use('/dailyLog', dailyLogRoute);
app.use('/task', taskRoute);
app.use('/subTask', subTaskRoute);

app.listen(PORT, ()=> {
  try {
    console.log("Tasks SERVER running on PORT", PORT);
  } catch (error) {
    console.log("ERROR: SERVER CRASHED,", error);
  }
});


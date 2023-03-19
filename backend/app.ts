import express, { Request, Response } from 'express';
import cors from "cors";
import "reflect-metadata";
import { RESPONSE } from './constant/response';

import config from './config/config.json';

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
const PORT = config.PORT;

app.use(cors())
// Using body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());

// => adding routes 
app.use("/user", userRoute);
app.use('/dailyLog', dailyLogRoute);
app.use('/task', taskRoute);
app.use('/subTask', subTaskRoute);

// Error response for invalid routes.
app.all("*", (req: Request, res: Response) => {
  res.status(RESPONSE.ROUTE_NOT_FOUND.statusCode).json({
    ...RESPONSE.ROUTE_NOT_FOUND
  })
})


app.listen(PORT, ()=> {
  try {
    console.log("Tasks SERVER running on PORT", PORT);
  } catch (error) {
    console.log("ERROR: SERVER CRASHED,", error);
  }
});


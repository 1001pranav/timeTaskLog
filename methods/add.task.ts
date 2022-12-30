import e from "express";
import { Status, TaskType } from "../constant/constant";
import { RESPONSE } from "../constant/response";
import { replaceStatusMessage } from "../library/helperLib/responseHelper";
import { addTasks } from "../library/sql/tasks.sql";
import { updateUserTasks } from "../library/sql/user.sql";


const addTask = async (req, res, next) => {
  try {

    const { name } = req.body;
    const { userData  } = res.locals;

    let { 
      description, 
      start_time: startTime, 
      end_time: endTime,
      completion_percentage: completionPercentage 
    } = req.body;

    if( !name ) {
      const statusMessage = replaceStatusMessage("MISSING_DATA", {"<data>": "name"});
      res.status(RESPONSE.MISSING_DATA.statusCode).json({
        ...RESPONSE.MISSING_DATA,
        statusMessage
      })
    }
    console.log(userData.id);
    
    if ( !description ) description = null;
    if ( !startTime ) startTime = null;
    else startTime = new Date(startTime);
    if ( !endTime ) endTime = null;
    else endTime = new Date(endTime);
    if( completionPercentage <= 0 ) completionPercentage = 0;
    const taskData = await addTasks({
      name, 
      description, 
      startTime, 
      endTime, 
      completionPercentage, 
      status: Status.ACTIVE, 
      taskType: TaskType.MAIN, 
      createdBy: userData.id
    });
    await updateUserTasks(userData.id, taskData)

    res.status(RESPONSE.SUCCESS.statusCode).json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log("API: task/add", error);
    res.status(RESPONSE.SOMETHING_WRONG.statusCode).json(RESPONSE.SOMETHING_WRONG)
  }

}
export { addTask };

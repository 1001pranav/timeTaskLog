import { Status, tasksDB, TaskType, userDB } from "../constant/constant";
import { RESPONSE } from "../constant/response";

import { replaceStatusMessage } from "../library/helperLib/responseHelper";
import { verifyTime } from "../library/helperLib/verifyHelper";

import { addSubTasks, addTasks } from "../library/sql/tasks.sql";
import { updateUserTasks } from "../library/sql/user.sql";
import { listUserTaskByID } from "../library/sql/userTasks.sql";

const addTask = async (req, res, next) => {
  try {

    const { name, task_id, spent_time: spentTime, total_time: totalTime } = req.body;
    const { userData  } = res.locals;

    let { 
      description, 
      start_time: startTime, 
      end_time: endTime,
      completion_percentage: completionPercentage,
      task_type: taskType,
    } = req.body;

    if( !name ) {
      const statusMessage = replaceStatusMessage("MISSING_DATA", {"<data>": "name"});
      res.status(RESPONSE.MISSING_DATA.statusCode).json({
        ...RESPONSE.MISSING_DATA,
        statusMessage
      });
      return;
    }

    if( spentTime && !verifyTime(spentTime) ){
      const statusMessage: string = replaceStatusMessage("INCORRECT_DATA", {"<data>": spentTime});
      res.status(RESPONSE.INCORRECT_DATA.statusCode).json({...RESPONSE.INCORRECT_DATA, statusMessage});
      return;
    }

    if( totalTime && !verifyTime(totalTime) ){
      const statusMessage: string = replaceStatusMessage("INCORRECT_DATA", {"<data>": totalTime});
      res.status(RESPONSE.INCORRECT_DATA.statusCode).json({...RESPONSE.INCORRECT_DATA, statusMessage});
      return;
    }

    if ( !TaskType[taskType] ) taskType = TaskType.MAIN;
    else if( taskType ) taskType = TaskType[taskType];

    if( taskType === TaskType.DAILY_TASK ) {
      if ( !startTime || startTime == "" ) {
        startTime = (new Date().setUTCHours(0, 0, 0, 0));
      }
      if( !endTime || endTime == "" ) {
        endTime = new Date().setUTCHours(23,59,59,999)
      }
    }

    if ( task_id ) {
      const userTaskData: userDB = await listUserTaskByID(userData.id, task_id);
      
      if ( !userTaskData?.userTasks ) {

        const statusMessage: string = replaceStatusMessage(
          "NOT_FOUND", {"<data>": `task with task ID: ${task_id}`}
        );
        
        res
          .status(RESPONSE.NOT_FOUND.statusCode)
          .json(
            {...RESPONSE.NOT_FOUND, statusMessage }
          )
        return;
      }
    }
    
    if ( !description ) description = null;
    if ( !startTime ) startTime = null;
    else startTime = new Date(startTime);
    if ( !endTime ) endTime = null;
    else endTime = new Date(endTime);
    if( completionPercentage <= 0 ) completionPercentage = 0;
    
    const taskData: tasksDB = await addTasks({
      name, 
      description, 
      startTime, 
      endTime, 
      spentTime,
      totalTime,
      completionPercentage, 
      status: Status.ACTIVE, 
      taskType, 
      createdBy: userData.id
    });
    await updateUserTasks(userData.id, taskData);

    if( task_id ) {
      await addSubTasks(taskData, task_id);
    }
    
    res.status(RESPONSE.SUCCESS.statusCode).json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log("API: task/add", error);
    res.status(RESPONSE.SOMETHING_WRONG.statusCode).json(RESPONSE.SOMETHING_WRONG);
    return;
  }

}
export { addTask };

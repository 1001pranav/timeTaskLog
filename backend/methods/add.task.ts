import { 
  Status, 
  TaskPriority, 
  TasksDB, 
  TaskType, 
  UserDB,
  RESPONSE
} from "../constant/index";

import { verifyHelper, responseHelper } from "../library/helperLib/helper";

import { tasks, user, userTasks } from '../library/sql/sql';

const addTask = async (req, res, next) => {
  try {

    const { name, task_id, spent_time: spentTime, total_time: totalTime } = req.body;
    const { userData } = res.locals;

    let { 
      description, 
      start_time: startTime, 
      end_time: endTime,
      completion_percentage: completionPercentage,
      task_type: taskType,
      task_priority: taskPriority,
    } = req.body;

    if( !name ) {
      const statusMessage = responseHelper.replaceStatusMessage("MISSING_DATA", {"<data>": "name"});
      res.status(RESPONSE.MISSING_DATA.statusCode).json({
        ...RESPONSE.MISSING_DATA,
        statusMessage
      });
      return;
    }

    if( spentTime && !verifyHelper.verifyTime(spentTime) ){
      const statusMessage: string = responseHelper.replaceStatusMessage("INCORRECT_DATA", {"<data>": spentTime});
      res.status(RESPONSE.INCORRECT_DATA.statusCode).json({...RESPONSE.INCORRECT_DATA, statusMessage});
      return;
    }

    if( totalTime && !verifyHelper.verifyTime(totalTime) ){
      const statusMessage: string = responseHelper.replaceStatusMessage("INCORRECT_DATA", {"<data>": totalTime});
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

    if(!TaskPriority[taskPriority]) taskPriority = TaskPriority.NOT_IMPORTANT
    else if(taskPriority) taskPriority = TaskPriority.NOT_IMPORTANT;

    if ( task_id ) {
      const userTaskData: UserDB = await userTasks.listUserTaskByID(userData.id, task_id);
      
      if ( !userTaskData?.userTasks ) {

        const statusMessage: string = responseHelper.replaceStatusMessage(
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
    
    const taskData: TasksDB = await tasks.addTasks({
      name, 
      description, 
      startTime, 
      endTime, 
      spentTime,
      totalTime,
      completionPercentage, 
      status: Status.ACTIVE, 
      taskType, 
      taskPriority,
      createdBy: userData.id,
      userData
    });
    await user.updateUserTasks(userData.id, taskData);

    if( task_id ) {
      await tasks.addSubTasks(taskData, task_id);
    }
    
    res.status(RESPONSE.SUCCESS.statusCode).json(RESPONSE.SUCCESS);
    return {}
  } catch (error) {
    console.log("API: task/add", error);
    res.status(RESPONSE.SOMETHING_WRONG.statusCode).json(RESPONSE.SOMETHING_WRONG);
    return;
  }

}
export { addTask };

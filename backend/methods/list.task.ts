import {
  TaskType, 
  userDB, 
  Pagination, 
  User 
} from "../constant/constant";
import { RESPONSE } from "../constant/response";
import { replaceStatusMessage } from "../library/helperLib/responseHelper";
import { 
  avgSubTask, 
  countSubTasks, 
  getDailyTasks, 
  listUserSubTask, 
  listUserTaskByID, 
  listUserTasks 
} from "../library/sql/userTasks.sql";

const listTask = async (req, res, next) => {
  
  try {

    const { 
      userData 
    }: {
      userData: User
    } = res.locals;
    
    const { 
      task_id = 0, 
    } :{
      task_id: number, 
    } = req.query;

    let { 
      limit = 0, 
      page_number = 0, 
    }: Pagination = req.query;

    let {
      task_type
    } = req.query;

    console.log(task_type);
    
    limit = limit? limit: 0; 
    page_number = page_number? page_number: 0;

    let tasks = [];
    
    if( task_type === TaskType.SUB_TASK && !task_id ) {

      const statusMessage = replaceStatusMessage(
        "MISSING_DATA", { "<data>": "task_id is required for listing sub task" }
      );

      res.status(RESPONSE.MISSING_DATA.statusCode).json({
        ...RESPONSE.MISSING_DATA,
        statusMessage
      });
      return {};
    } 
    
    if( task_id ) {

      let userDataTasks: userDB;

      if( task_type === TaskType.SUB_TASK )
        userDataTasks = (await listUserSubTask(userData.id, task_id))[0];
      else
        userDataTasks = (await listUserTaskByID(userData.id, task_id));  
  
      if(userDataTasks?.userTasks[0]) {
        tasks.push({
          task_id: userDataTasks.userTasks[0].id,
          name: userDataTasks.userTasks[0].name,
          description: userDataTasks.userTasks[0].description,
          start_time: userDataTasks.userTasks[0].start_time,
          end_time: userDataTasks.userTasks[0].end_time,
          total_time: userDataTasks.userTasks[0].total_time,
          spent_time: userDataTasks.userTasks[0].spent_time,
          completion_percentage: userDataTasks.userTasks[0].competition_percentage,
          status: userDataTasks.userTasks[0].status,
          subTasks: userDataTasks.userTasks[0].SubTask  
        })
      }
      
     
    } else {

      let userDataTasks: userDB;

      if( !task_type || TaskType.DAILY_TASK !== task_type ){
        userDataTasks = (await listUserTasks(userData.id, task_type))[0];
      }else {
        userDataTasks = (await getDailyTasks(userData.id))[0];
      }

      if( userDataTasks?.userTasks) {
        
        userDataTasks.userTasks.forEach((userTasksObj) => {
          
          tasks.push({
            task_id: userTasksObj.id, 
            name: userTasksObj.name, 
            description: userTasksObj.description, 
            end_time: userTasksObj.end_time? new Date(userTasksObj.end_time): userTasksObj.end_time, 
            start_time: userTasksObj.start_time? new Date(userTasksObj.start_time): userTasksObj.start_time,
            spent_time: userTasksObj.spent_time,
            total_time: userTasksObj.total_time, 
            task_type: userTasksObj.task_type,
            task_priority: userTasksObj.task_priority,
            completion_percentage: userTasksObj.competition_percentage,
            status: userTasksObj.status
          })
        });

        if ( task_type == TaskType.MAIN ) { 

          for ( let i in tasks ) {
            // tasks[i].average_completion = await avgSubTask(tasks[i].task_id, userData.id);
            tasks[i].tasks_count = await countSubTasks(tasks[i].task_id, userData.id);
            console.log(tasks[i].average_completion, tasks[i].tasks_count);            
          }
        }
      }
    }
    
    const metaData : {
      limit: number, 
      page_number: number, 
      total_count: number
    } = {
      limit,
      page_number,
      total_count: tasks.length
    }

    if( limit ) {
      if (page_number) page_number -= 1;
      else page_number = 0;
      tasks = tasks.slice(page_number, page_number+limit);
    }
    
    res.status(RESPONSE.SUCCESS.statusCode).json({
        ...RESPONSE.SUCCESS, 
        data: {
          tasks, 
          meta_data: metaData
        } 
      }
    )

    return {};
  } catch (error) {
    console.log("Error: tasks/list", error);
    return {};
  }
}
export { listTask }; 

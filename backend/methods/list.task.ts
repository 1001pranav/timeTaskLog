import { tasksDB, TaskType, userDB } from "../constant/constant";
import { RESPONSE } from "../constant/response";
import { replaceStatusMessage } from "../library/helperLib/responseHelper";
import { listUserSubTask, listUserTaskByID, listUserTasks } from "../library/sql/userTasks.sql";

const listTask = async (req, res, next) => {
  
  try {

    const { userData } = res.locals;
    const { task_id, sub_task: subTasks } = req.query;
    let { limit, page_number, task_type } = req.query;

    limit = limit? limit: 0;
    page_number = page_number? page_number: 0;

    let tasks = [];
    
    if( subTasks && !task_id ) {

      const statusMessage = replaceStatusMessage(
        "MISSING_DATA", { "<data>": "task_id is required for subTasks" }
      );

      res.status(RESPONSE.MISSING_DATA.statusCode).json({
        ...RESPONSE.MISSING_DATA,
        statusMessage
      });
      return {};
    } 
    
    if( task_id ) {
      let userDataTasks: userDB;
      if( subTasks == 1 )
        userDataTasks = (await listUserSubTask(userData.id, task_id))[0]
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
          completition_percentage: userDataTasks.userTasks[0].competition_percentage,
          status: userDataTasks.userTasks[0].status,
          subTasks: userDataTasks.userTasks[0].SubTask  
        })
      }
      
     
    } else {

      task_type = task_type && TaskType[task_type] ? TaskType[task_type]: null;
      console.log(task_type);
      
      const userDataTasks: userDB = (await listUserTasks(userData.id, task_type))[0];
      // const userDataTasks: userDB = (await listUserSubTask(userData.id))[0];
      
      if( userDataTasks?.userTasks) {
        console.log(userDataTasks.userTasks);
        
        userDataTasks.userTasks.forEach((userTasksObj) => {
          console.log(userTasksObj);
          
          tasks.push({
            task_id: userTasksObj.id, 
            name: userTasksObj.name, 
            description: userTasksObj.description, 
            end_time: userTasksObj.end_time? new Date(userTasksObj.end_time): userTasksObj.end_time, 
            start_time: userTasksObj.start_time? new Date(userTasksObj.start_time): userTasksObj.start_time,
            spent_time: userTasksObj.spent_time,
            total_time: userTasksObj.total_time, 
            task_type: userTasksObj.task_type,
            competition_percentage: userTasksObj.competition_percentage,
            status: userTasksObj.status
          })
        });
      }
    }
    
    
    if( limit ) {
      if (page_number) page_number -= 1;
      else page_number = 0;
      tasks = tasks.slice(page_number, page_number+limit);
    }
    res.status(RESPONSE.SUCCESS.statusCode).json({...RESPONSE.SUCCESS, data: {tasks} })
  } catch (error) {
    console.log("Error: tasks/list", error);
    
  }
}

export { listTask };


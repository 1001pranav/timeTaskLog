import { tasksDB, userDB } from "../constant/constant";
import { RESPONSE } from "../constant/response";
import { listUserTaskByID, listUserTasks } from "../library/sql/userTasks.sql";

const listTask = async (req, res, next) => {
  
  const {userData} = res.locals;
  const { task_id } = req.query;
  let { limit, page_number } = req.query;

  limit = limit? limit: 0;
  page_number = page_number? page_number: 0;

  let tasks = [];
  
  if( task_id ) {
    
    const userDataTasks: userDB = (await listUserTaskByID(userData.id, task_id))[0];
    if(userDataTasks?.userTasks[0]) {
      tasks.push({
        task_id: userDataTasks.userTasks[0].id,
        name: userDataTasks.userTasks[0].name,
        description: userDataTasks.userTasks[0].description,
        start_time: userDataTasks.userTasks[0].start_time,
        end_time: userDataTasks.userTasks[0].end_time,
        completition_percentage: userDataTasks.userTasks[0].competition_percentage,
        status: userDataTasks.userTasks[0].status
      })
    }
      
  } else {

    const userDataTasks: userDB = (await listUserTasks(userData.id))[0];
    console.log(userDataTasks);
    
    if( userDataTasks?.userTasks) {
      console.log(userDataTasks.userTasks);
      
      userDataTasks.userTasks.forEach((userTasksObj) => {
        console.log(userTasksObj);
        
        tasks.push({
          task_id: userTasksObj.id, 
          name: userTasksObj.name, 
          description: userTasksObj.description, 
          end_time: userTasksObj.end_time, 
          start_time: userTasksObj.start_time, 
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
}

export { listTask };


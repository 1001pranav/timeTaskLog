import { Status, updateTask, userDB } from '../constant/constant';
import { RESPONSE } from '../constant/response';
import { replaceStatusMessage } from "../library/helperLib/responseHelper";
import { updateTask as taskUpdate } from '../library/sql/tasks.sql';
import { listUserTaskByID } from '../library/sql/userTasks.sql';

const  updateTask = async (req, res, next) => {
  
  const { 
    task_id, 
    name, 
    description, 
    start_time, 
    end_time, 
    completition_percentage,
    status 
  } = req.body;
  
  const { userData } = res.locals;

  if( !task_id ) {
    
    const updatedMessage: string = replaceStatusMessage(
      "MISSING_DATA", 
      {"<data>": "task_id"}
    );
    res.status(RESPONSE.MISSING_DATA.statusCode).json({
      ...RESPONSE.MISSING_DATA,
      statusMessage: updatedMessage
    });
  } 
  const userTask:userDB = await listUserTaskByID( userData.id, task_id);
  console.log(userTask);
  
  if( !userTask?.userTasks[0] ) {
    
    const statusMessage :string = replaceStatusMessage(
      "NOT_FOUND", { "<data>": `task with ID ${task_id}` }
    )
    res.status(RESPONSE.NOT_FOUND.statusCode).json({
      ...RESPONSE.NOT_FOUND,
      statusMessage
    })
  }
  let updateObj: updateTask = {
    status
  };
  if (name) updateObj.name = name;
  if ( !status || status && Status[status] ) updateObj.status = userTask.userTasks[0].status;
  else updateObj.status = status; 
  if (start_time) updateObj.start_time = start_time;
  if (end_time) updateObj.end_time = end_time;
  if (description) updateObj.description = description;
  if (completition_percentage) updateObj.competition_percentage = completition_percentage;

  await taskUpdate( updateObj, task_id );
  res.status(RESPONSE.SUCCESS.statusCode).json(RESPONSE.SUCCESS)
  
}

 

export {
  updateTask
};


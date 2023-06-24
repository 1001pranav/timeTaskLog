import { 
  Status, 
  UpdateTask, 
  UserDB, 
  RESPONSE 
} from '../constant/index';

import { replaceStatusMessage } from "../library/helperLib/responseHelper";
import { verifyTime } from '../library/helperLib/verifyHelper';
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
    status,
    spent_time,
    total_time
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
    return {}
  } 

   if( spent_time && !verifyTime(spent_time) ){
      const statusMessage: string = replaceStatusMessage("INCORRECT_DATA", {"<data>": spent_time});
      res.status(RESPONSE.INCORRECT_DATA.statusCode).json({...RESPONSE.INCORRECT_DATA, statusMessage});
      return;
    }

    if( total_time && !verifyTime(total_time) ){
      const statusMessage: string = replaceStatusMessage("INCORRECT_DATA", {"<data>": total_time});
      res.status(RESPONSE.INCORRECT_DATA.statusCode).json({...RESPONSE.INCORRECT_DATA, statusMessage});
      return;
    }
  const userTask : UserDB = await listUserTaskByID( userData.id, task_id);
  console.log(userTask);
  
  if( !userTask?.userTasks[0] ) {
    
    const statusMessage :string = replaceStatusMessage(
      "NOT_FOUND", { "<data>": `task with ID ${task_id}` }
    )
    res.status(RESPONSE.NOT_FOUND.statusCode).json({
      ...RESPONSE.NOT_FOUND,
      statusMessage
    });
    return {}
  }
  let updateObj: UpdateTask = {
    status: undefined
  };

  // console.log("status", Status[status], status, Status);
  
  if (name) updateObj.name = name;
  if ( !status || (status && !Status[status]) ) updateObj.status = userTask.userTasks[0].status;
  else updateObj.status = Status[status]; 
  if (start_time) updateObj.start_time = start_time;
  if (end_time) updateObj.end_time = end_time;
  if (description) updateObj.description = description;
  if (spent_time) updateObj.spent_time = spent_time;
  if (total_time) updateObj.total_time = total_time;
  if (completition_percentage) updateObj.competition_percentage = completition_percentage;

  console.log(updateObj);
  
  await taskUpdate( updateObj, task_id );
  res.status(RESPONSE.SUCCESS.statusCode).json(RESPONSE.SUCCESS)
  return {}
}

 

export {
  updateTask
};


import { listUserTasks } from "../library/sql/userTasks.sql";

const listTask = async (req, res, next) => {
  
  const {userData} = res.locals;

  const userDataTasks: any = (await listUserTasks(userData.id))[0];

  let tasks = [];
  
  if( userDataTasks?.userTasks) {
    userDataTasks.userTasks.forEach(({
      id, 
      name, 
      description, 
      end_time, 
      start_time, 
      task_type,
      competition_percentage,
      status
    }) => {
      tasks.push({
        task_id: id, 
        name, 
        description, 
        end_time, 
        start_time, 
        task_type,
        competition_percentage,
        status
      })
    });
  }
  res.json()
}

export { listTask };


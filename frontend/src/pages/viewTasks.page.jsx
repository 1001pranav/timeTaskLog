import { useMemo, useState } from "react"
import { TasksCard } from "../components/task.card";
import { API_RESOURCE } from "../constants/API.const";
import { makeGETMethod } from "../services/apiServices"

export default function ViewTasks() {

  console.log("view tasks...");
  /*
    > useEffect is used for conditional rendering. 
    > useEffect is called after page is loaded.
  */ 
  

  const [tasksData, setTaskData] = useState({});
  const [pagination, setPagination] = useState({
    limit: 5,
    pageNumber: 1
  })

  function viewTasks( limit, pageNumber ){
     makeGETMethod({
      headers: {
        'Access-Control-Allow-Origin':'*', 
        "content-type": "application/json",
        "access_token": localStorage.getItem("access_token")
      },
      apiResource: API_RESOURCE.task.list,
      data: {
        limit,
        pageNumber
      }
    }).then((response)=> {
      console.log("> data >", response.data);
      setTaskData(response.data);
    })
  }

  /*
    > useMemo will re-render when the dependencies are updated
    > In the below example the function viewTasks are called once, 
      When the limit or page number is changed then the viewTasks functions are called again.
  */
  useMemo(
    ()=> viewTasks(
      pagination.limit,
      pagination.pageNumber
    ), [
      pagination.limit,
      pagination.pageNumber
    ]
  )
 const [Tasks, setTasksData] = useState([])
  console.log("Tasks", tasksData.tasks);
  const tempTasks = [];
  if(tasksData?.tasks) {

    tempTasks.push(tasksData.tasks.map(({
      task_id,
      name,
      description,
      start_time,
      end_time,
      spent_time,
      total_time,
      completion_percentage,
      status
    })=>{
    
      const startDate = start_time ? formatDate(start_time) : "";
      const startTime = start_time ?formatDateTime(start_time) : "";
      const endDate = end_time ? formatDate(end_time) : "";
      const endTime = end_time ? formatDateTime(end_time) : "";
      spent_time = spent_time.slice(0, 5)?? "00:00";
      total_time = total_time.slice(0, 5)?? "00:00";
      /*
        > "??" is Nullish coalescing operator 
          > if value in left is null then return right value. 
      */ 
      let tasks = {
        task_id,
        name: name ?? "",
        description: description ?? "",
        startDate, startTime, endDate, endTime, 
        spent_time, total_time,
        completion_percentage: completion_percentage?? 0
      }
      return <TasksCard taskData={tasks}/> 
    }))
  }
  console.log(tempTasks.length);
  if(Tasks.length !== tempTasks.length )
    setTasksData([
        ...Tasks,
      tempTasks
      ])
  console.log(Tasks.length);
  return (
    <div className="flex-wrap">
      {Tasks}
    </div>
  )
}

function formatDate(date) {
  
  date = new Date(date)

  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  // > If less than 10 then add 0 to end 
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  
  return  dd + "/" + mm + "/" + "/" + yyyy
}

function formatDateTime(date) {
  
  date = new Date(date);
  let hours = date.getHours();
  let min = date.getMinutes();
  
  hours = hours < 10 ? '0' + hours : hours;
  min = min < 10 ? '0' + min : min;
   
  return hours + "-" + min;
}

// function formatTime(time) {
//   return time.replaceAll(":", "-")
// }
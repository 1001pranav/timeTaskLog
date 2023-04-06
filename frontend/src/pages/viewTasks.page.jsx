import { useMemo, useState } from "react"
import { TasksCard } from "../components/task.card";
import { API_RESOURCE } from "../constants/API.const";
import { makeGETMethod } from "../services/apiServices"

export default function ViewTasks() {

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
      apiResource: API_RESOURCE.taskList,
      data: `limit=${limit}&page_number=${pageNumber}`
    }).then((response)=> {
      setTaskData(response.data);
    })
  }

  useMemo(()=> viewTasks(pagination.limit,pagination.pageNumber), [pagination.limit,pagination.pageNumber]) 
  const titleObj = {
    title: "Tasks List"
  }
  return (
    <div className="flex">
      <TasksCard />
      <TasksCard />
    </div>
  )
}
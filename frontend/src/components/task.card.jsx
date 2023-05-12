import { Fragment } from "react";

import Input, { Select, TextArea } from "./input.component"
import { Button } from "./button.component"
import "../styles/tasks.card.css"
import { PRIORITY } from "../constants/constant";
import { useState } from "react";

export function TasksCard({
  taskData
}) {

  const [updatedTaskData, setTaskData] = useState(taskData)

  // > Update the data from state.
  const updateExistingTask = (event) => {
    
    // > event.target.value consist the value from the input field
    let value = event.target.value;

    if( event.target.name === "completion_percentage" ) {

      /*
        > Fixing the value greater than 100 to 100,
        > similarly setting the value less than 0 to 0.
      */ 
     
      if( value > 100 ) value = 100;
      else if ( value < 0 ) value = 0;
    }
    
    setTaskData({
      ...updatedTaskData,
      [event.target.name]: value
    })
  }

  const updateTask = () => {}
  return (
    <form className="task-container" onSubmit={updateTask}>
      <input type="number" className="hidden" value={updatedTaskData.task_id} />
        <div className="container-top">
          <Input 
            value={updatedTaskData.name} 
            name={"name"} 
            className={"top-title"} 
            handleValue={updateExistingTask}
          />
        </div>
        <div className="task-card">
          <div className="card-start">
            <span>
              Start 
              <Input 
                type={"date"} 
                handleValue={updateExistingTask} 
                name={"startDate"} 
                value={updatedTaskData.startDate}  
              />  
              <Input 
                type={"time"} 
                value={updatedTaskData.startTime}
                name={"startTime"} 
                handleValue={updateExistingTask}
              />
            </span>
            <span>
              End 
              <Input 
                type={"date"} 
                value={updatedTaskData.endDate} 
                className={"time-margin"}
                name={"endDate"} 
                handleValue={updateExistingTask} 
              /> 
              <Input 
                type={"time"} 
                value={updatedTaskData.endTime}
                name={"endTime"}
                handleValue={updateExistingTask}
              />
            </span>
          </div>
          <div className="card-desc">
            <TextArea 
              handleValue={updateExistingTask}
              name={"description"} 
              value={updatedTaskData.description} 
            />
          </div>
          <div className="task-card-sub">
            <div className="card-end">
              <span>
                Total 
                <Input 
                  type={"time"} 
                  value={updatedTaskData.total_time} 
                  className={"time-margin"} 
                  name={"total_time"} 
                  handleValue={updateExistingTask} 
                />
              </span>
              <span>
                Spent 
                <Input 
                  type={"time"} 
                  value={updatedTaskData.spent_time}
                  name={"spent_time"} 
                  handleValue={updateExistingTask} 
                />
              </span>
            </div>
            <div className="card-misc">
              <Button type={"submit"} nameClass={"fa fa-trash fa-lg "} />
              <Button nameClass={"fa-solid  fa-pencil fa-lg"}  />
            </div>
          </div>
        </div>
        <div className="container-footer">
          <Select name="priority" className={"priority"} options={PRIORITY} defaultValue={2}/>
          <Input type={"Text"} name={"goal"} handleValue={updateExistingTask}   className={"goal"} value={"GOALLLL"} />
          <Input type={"number"} name={"completion_percentage"} handleValue={updateExistingTask} value={updatedTaskData.completion_percentage} min={0} max={100} />
        </div>
    </form>
    
  )
}

export function MainTasks({ taskData, onClick}) {
  const [taskID, setTaskID] = useState(0)
  if(taskID === 0)
    setTaskID(taskData.task_id)
  /*
    > Here react fragment component is used to for making component unique in maps
  */ 
  return <div className="taskCard"  onClick={e=> onClick(taskID)}>
    <Input type="hidden" name={"id"} value={taskData.task_id} />
    <p className="taskTitle">
      <span> 
        {taskData.name}
      </span>  
      <span> 
        TP: {taskData.task_priority}
      </span>
    </p>
    <p>
      <span> Total tasks: {taskData.tasks_count ?? 0} </span>
      <span> Start: {taskData.start_time ?? "-.-/-.-/-.-.-.- -.-:-.-"} </span>
    </p>
    <p>
      <span>Average Progress: {taskData.average_completion ?? 0}</span>
      <span>End: {taskData.end_time ?? "-.-/-.-/-.-.-.- -.-:-.-"} </span>
    </p>
  </div>

}
import {  Fragment, useEffect, useMemo, useRef, useState } from "react";

import { checkIsLoggedIn } from "../services/loginServices";
import { makeGETMethod } from "../services/apiServices";
import { TASK_TYPE } from "../constants/constant";
import { API_RESOURCE } from "../constants/API.const";
import '../styles/home.page.css';
import { MainTasks } from "../components/task.card";

export default function HomePage({isLoggedIn}) {

  const [ mainTask, setMainTask ] = useState([]);
  const [ subTask, setSubTask ] = useState([]);
  const [ subTaskDisplay, setSubTaskDisplay ] = useState({task_id: 0, subTask_display: false})

  function updateSubTask(subTaskID) {
    console.log("UpdateSubTask", subTaskID === subTaskDisplay  );
    if( subTaskID === subTaskDisplay ) {
      setSubTaskDisplay({task_id: 0, subTask_display: false});
    }
    else{ 
      setSubTaskDisplay({task_id: subTaskID, subTask_display: true});
      console.log(subTaskDisplay, subTaskID);
    }
    console.log(subTaskDisplay);
  }
  /*
    > If user is logged in then display the main task, and Daily tasks
  */ 
  let [isLogin, accessToken] = useMemo(()=> {
    let task = [];

    const [login, accessToken] = checkIsLoggedIn(isLoggedIn);
    
    if(login) {

      makeGETMethod({
      headers: {
        access_token: accessToken,
      },
      data: {
        task_type: TASK_TYPE.MAIN
      },
      apiResource: API_RESOURCE.task.list
    })
    .then((response)=> {

      /*
        > initially sort the tasks based on the priority then amount of avg percentage
      */ 
      let tasks = response.data.tasks.sort((a, b)=> {return a.task_priority - b.task_priority});
      tasks = tasks.sort((a, b)=> {return b.average_completion - a.average_completion });

      task = tasks.map((taskData)=> {
        return <Fragment key={taskData.task_id}> 
          <MainTasks taskData={taskData} onClick={updateSubTask}/>
        </Fragment>
      })

      if( task.length !== mainTask.length ) { 
        setMainTask(task);
      }
    })
      
      return [ true, accessToken ]
    }

    return [false, null];
  },[mainTask, updateSubTask, isLoggedIn]);

  useEffect(()=> {
    console.log(isLogin && 
      subTaskDisplay.subTask_display &&
      subTaskDisplay.task_id !== 0 &&
      subTask.length === 0,{isLogin, subTaskDisplay, });
    if( 
      isLogin && 
      subTaskDisplay.subTask_display &&
      subTaskDisplay.task_id !== 0 &&
      subTask.length === 0
    ) { 
      makeGETMethod({
        headers: {
          access_token: accessToken,
        },
        data: {
          task_type: TASK_TYPE.SUB_TASK,
          task_id: subTaskDisplay.task_id,
        },
        apiResource: API_RESOURCE.task.list
      })
      .then((response)=> {
        console.warn(response.data)
      })
    }
  }, [subTaskDisplay, accessToken, isLogin, subTask])
  let task  = mainTask
  return (
    <div className="homePage">
      <div className="taskList">
        {task}
      </div>
    </div>
  )
}

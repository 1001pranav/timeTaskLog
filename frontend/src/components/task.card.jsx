import Input, { Select, TextArea } from "./input.component"
import { Button, ImageButton } from "./button.component"
import "../styles/tasks.card.css"
import { Trash } from '../styles/fontAwesome.component';
import { PRIORITY } from "../constants/constant";

export function TasksCard({
  taskObj,
  className,
  
 }) {


  return (
    <div className="task-container">
      <div className="container-top">
        {/* <Input value={"Priority"} className={"top-priority"}/>  */}
        <Input value={"title"} className={"top-title"}/>
        {/* <Input value={"goal"} className={"top-goal"}/> */}
      </div>
      <div className="task-card">
        <div className="card-start">
          <span>Start <Input type={"date"} className /> </span>
          <span>End <Input type={"date"} className={"time-margin"} /></span>
        </div>
        <div className="card-desc">
          <TextArea />
        </div>
        <div className="task-card-sub">
          <div className="card-end">
            <span>Total <Input type={"time"} className={"time-margin"} /></span>
            <span>Spent <Input type={"time"} /></span>
          </div>
          <div className="card-misc">
            <Button nameClass={"fa fa-trash fa-lg "} />
            <Input type={"number"} value={100} min={0} max={100} />
          </div>
        </div>
      </div>
      <div className="container-footer">
        <Select name="priority"options={PRIORITY} defaultValue={2}/>
        <Input type={"Text"}  value={"GOALLLL"} />
      </div>
    </div>
  )
}
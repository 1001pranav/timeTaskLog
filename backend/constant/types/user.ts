import { Status,TasksDB } from "../index"

export interface UserDB {
  id: number,
  user_name: string,
  email: string,
  password: string,
  access_token: string,
  status: Status,
  created_at: Date,
  userTasks: Array<TasksDB>
}

export interface UserData {
  userName: string, 
  email: string, 
  password: string
}
export interface User {
  id: number,
  email: string,
  password: string,
  user_name: string,
  access_token: string
}


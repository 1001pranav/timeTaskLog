import { DataSource } from 'typeorm'

import { MYSQL } from '../../config/config.json'
import { ContactUs } from './entity/contactUs'

import { Tasks } from './entity/Tasks'
import { User } from './entity/User'
// import { UserTasks } from './entity/UserTasks'

export const AppDataSource = new DataSource({
  type: "mysql",
  host: MYSQL.HOST,
  username: MYSQL.USERNAME,
  password: MYSQL.password,
  port: MYSQL.PORT,
  database: MYSQL.DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Tasks, ContactUs]
})
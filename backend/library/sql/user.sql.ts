import { Status, TasksDB, UserData, UserDB } from '../../constant/index';
import { AppDataSource } from "./dataSource";
import { User } from "./entity/User";

type getUser = (userObj: {}) => Promise<UserData>;

/**
 * @param {string} userID - String of to find User.
*/
const getUserByID = async (userID: number ) => {
  return AppDataSource.manager
    .createQueryBuilder(User, 'user')
    .where('user.id = :id', {id: userID})
    .andWhere('user.status != :status', {status: Status.DELETED})
    .getOne();
}

/**
 * @param {string} userName - name of the user
 * @param {string} email - email_id to log in
 * @param {string} password - password to login with
 * @param {string} createdBy - user who refereed the user 
*/
const createUser = async (userObj: UserData)  => {
  const user = new User()
  user.user_name = userObj.userName;
  user.email = userObj.email;
  user.password = userObj.password;
  await AppDataSource.manager.save(user);
}

const getUser = async (userObj:{}) : Promise<object> => {
  const userData = await AppDataSource.manager.findBy(User, userObj);
  return userData;
}

const updateUser = async (id: number, updateData: object) => {
  await AppDataSource.manager.update(User, {id}, updateData);
}

const updateUserTasks = async (id: number, updateData: TasksDB) => {
  console.log(id, updateData);
  
  const userData: Array<UserDB> = await AppDataSource.getRepository(User).find({
    where: {id},
    relations: { userTasks: true}
  });
  console.log(userData[0])
  if(userData[0]) {
    userData[0].userTasks.push(updateData);
    await AppDataSource.getRepository(User).save(userData);
  }
  

}

export {
  getUserByID, createUser, getUser, updateUser, updateUserTasks
};

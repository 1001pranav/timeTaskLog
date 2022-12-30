import { userData } from '../../constant/constant';
import { AppDataSource } from "./dataSource";
import { User } from "./entity/User";

type getUser = (userObj: {}) => Promise<userData>;

/**
 * @param {string} userID - String of to find User.
*/
const getUserByID = async (userID: number ) => {
  return AppDataSource.manager
    .createQueryBuilder(User, 'user')
    .where('user.id = :id', {id: userID}).getOne();
}

/**
 * @param {string} userName - name of the user
 * @param {string} email - email_id to log in
 * @param {string} password - password to login with
 * @param {string} createdBy - user who refereed the user 
*/
const createUser = async (userObj: userData)  => {
  const user = new User()
  user.user_name = userObj.userName;
  user.created_by = userObj.createdBy;
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

const updateUserTasks = async (id: number, updateData: object) => {
  console.log(id, updateData);
  
  const userData: any = await AppDataSource.getRepository(User).find({
    where: {id},
    relations: { userTasks: true}
  });
  console.log(userData[0])
  
  userData[0].userTasks.push(updateData);
  await AppDataSource.getRepository(User).save(userData);

}

export {
  getUserByID, createUser, getUser, updateUser, updateUserTasks
};

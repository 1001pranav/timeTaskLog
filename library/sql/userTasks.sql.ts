import { AppDataSource } from "./dataSource";

import { Tasks } from "./entity/Tasks";
import { User } from "./entity/User";

const listUserTasks = async (user_id: number) :Promise<object> => {
  
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.find({
    where: {
      id: user_id
    },
    relations: {
      userTasks: true
    }
  })
  // return userRepository
  //   .createQueryBuilder('User')
  //   .leftJoin('User.Tasks', 'User')

}

export {
  listUserTasks
};

import bcryptjs from 'bcryptjs';
import { User } from '../database/models';
import constants from '../utils/constants';

const checkUser = async (email: string) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error(constants.emailNotFound.msg);
  }

  return user;
};

const checkPassword = (bodyPassword: string, dbPassword: string) => {
  const isPasswordValid = bcryptjs.compareSync(bodyPassword, dbPassword);
  if (!isPasswordValid) {
    throw new Error(constants.invalidPassword.msg);
  }
};

export { checkPassword, checkUser };


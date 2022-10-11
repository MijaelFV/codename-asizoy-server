import { Request, Response } from 'express';
import generateJWT from '../../helpers/generate-jwt';
import { checkUser, checkPassword } from '../../helpers/db-validators';
import handleErrors from '../../helpers/handle-errors';

// const renewToken = async (req: Request, res: Response) => {
//   // const { id, name } = req.user;
//   const token = await generateJWT(id, name);

//   const checkedUser = {
//     token,
//     id,
//     name,
//   };

//   res.status(200).json(checkedUser);
// };

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Validations
    const user = await checkUser(email);
    if (user) checkPassword(password, user.password);

    const token = await generateJWT(user.id, user.name);
    res.status(200).json({
      token,
      id: user.id,
      name: user.name,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export default {
  login,
};

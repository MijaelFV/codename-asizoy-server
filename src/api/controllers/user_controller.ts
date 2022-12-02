import { Request, Response } from 'express';
import { User } from '../../database/models';
import generateJWT from '../../helpers/generate-jwt';
import bcryptjs from 'bcryptjs';
import handleErrors from '../../helpers/handle-errors';

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    res.status(200).json(user);
  } catch (error) {
    handleErrors(res, error);
  }
};

const postUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  let { email, password } = req.body;

  email = email.toLowerCase();

  try {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);

    const user = User.build({ name, email, password });
    await user.save();

    // JsonWebToken
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({ user, token });
  } catch (error) {
    handleErrors(res, error);
  }
};

export default {
  getUser,
  postUser,
};

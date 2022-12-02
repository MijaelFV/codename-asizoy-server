import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../database/models';
import { IJsonWebToken } from '../interfaces/jsonWebToken';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] ?? '';

  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request',
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY ?? '') as IJsonWebToken;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token - user does not exist',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

export default validateJWT;


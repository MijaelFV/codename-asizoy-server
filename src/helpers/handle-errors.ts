import { Response } from 'express';
import constants from '../utils/constants';

const handleErrors = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    if (error.message.includes('VD:')) {
      const errorCode = Number(error.message.slice(0, 3));
      res.status(errorCode).json({
        msg: error.message,
      });
    } else {
      res.status(500).json(constants.serverErrorResponse);
    }
  }
};

export default handleErrors;


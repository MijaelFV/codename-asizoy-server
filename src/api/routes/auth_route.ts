import { Router } from 'express';
import { check } from 'express-validator';
import { authController } from '../controllers/index';

const authRouter = Router();

authRouter.post(
  '/login',
  [check('email').isEmail().withMessage('The email does not have a valid format'), check('password').not().isEmpty().withMessage('Password is not valid')],
  authController.login,
);

export default authRouter;


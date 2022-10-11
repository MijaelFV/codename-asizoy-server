import { Router } from 'express';
import { check } from 'express-validator';
import { userController } from '../controllers/index';

const userRouter = Router();

// router.get('/', [], entryController.getEntries);

userRouter.get('/:id', [], userController.getUser);

// router.put(
//   '/:id',
//   [
//     check('concept').not().isEmpty().withMessage('Concept is required').isLength({ min: 2 }).withMessage('Must be at least 2 characters long'),
//     check('amount').not().isEmpty().withMessage('Amount is required').isLength({ min: 1 }).withMessage('Must be at least 1 characters long'),
//     check('category').not().isEmpty().withMessage('Category is required'),
//     check('date').not().isEmpty().withMessage('Date is required').isDate().withMessage('Must be a valid date'),
//   ],
//   entryController.putEntry,
// );

userRouter.post(
  '/',
  [
    check('name').not().isEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Must be at least 2 characters long'),
    check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Must be a valid email address'),
    check('password').not().isEmpty().withMessage('Password is required'),
  ],
  userController.postUser,
);

// router.delete('/:id', [], entryController.deleteEntry);

export default userRouter;


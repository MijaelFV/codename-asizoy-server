import { Router } from 'express';
import { check } from 'express-validator';
import { entryController } from '../controllers/index';

const entryRouter = Router();

// router.get('/', [], entryController.getEntries);

entryRouter.get('/:id', [], entryController.getEntry);

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

entryRouter.post(
  '/',
  [
    check('concept').not().isEmpty().withMessage('Concept is required').isLength({ min: 2 }).withMessage('Must be at least 2 characters long'),
    check('amount').not().isEmpty().withMessage('Amount is required').isLength({ min: 1 }).withMessage('Must be at least 1 characters long'),
    check('type').not().isEmpty().withMessage('Type is required').isIn(['income', 'expense']).withMessage('The entry must be an income or an expense'),
    check('category').not().isEmpty().withMessage('Category is required'),
    check('date').not().isEmpty().withMessage('Date is required').isDate().withMessage('Must be a valid date'),
  ],
  entryController.postEntry,
);

// router.delete('/:id', [], entryController.deleteEntry);

export default entryRouter;


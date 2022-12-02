import { Router } from 'express';
import { check } from 'express-validator';
import validateJWT from '../../middleware/validate-jwt';
import { entryController } from '../controllers/index';
import validateFields from '../../middleware/validate-fields';

const entryRouter = Router();

entryRouter.get('/', [
  validateJWT,
  validateFields
], entryController.getEntries);

entryRouter.get('/:id', [
  validateJWT,
  validateFields
], entryController.getEntry);

entryRouter.put('/:id', [], entryController.putEntry);

entryRouter.post(
  '/',
  [
    validateJWT,
    check('accountId')
      .not().isEmpty().withMessage('AccountID is required'),
    check('concept')
      .not().isEmpty().withMessage('Concept is required'),
    check('amount')
      .not().isEmpty().withMessage('Amount is required'),
    check('type')
      .not().isEmpty().withMessage('Type is required')
      .isIn(['income', 'expense']).withMessage('The entry must be an income or an expense'),
    check('quoted')
      .not().isEmpty().withMessage('Quoted is required'),
    check('isFulfilled')
      .not().isEmpty().withMessage('isFulfilled is required'),
    check('date')
      .not().isEmpty().withMessage('Date is required'),
    validateFields,
  ],
  entryController.postEntry,
);

entryRouter.delete('/:id', [], entryController.deleteEntry);

export default entryRouter;


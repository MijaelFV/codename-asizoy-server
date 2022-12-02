import { Router } from 'express';
import { check } from 'express-validator';
import validateJWT from '../../middleware/validate-jwt';
import { accountController } from '../controllers/index';
import validateFields from '../../middleware/validate-fields';

const accountRouter = Router();

accountRouter.get('/', [
  validateJWT,
  validateFields
], accountController.getAccounts);

accountRouter.get('/:id', [
  validateJWT,
  validateFields
], accountController.getAccount);

// accountRouter.put('/:id', [], accountController.putEntry);

accountRouter.post(
  '/',
  [
    validateJWT,
    check('name')
      .not().isEmpty().withMessage('Concept is required'),
    check('isCredit')
      .not().isEmpty().withMessage('Type is required')
      .isBoolean(),
    validateFields,
  ],
  accountController.postAccount,
);

// accountRouter.delete('/:id', [], accountController.deleteEntry);

export default accountRouter;


import { Request, Response } from 'express';
import handleErrors from '../../helpers/handle-errors';
import { AccountOutput } from '../../database/models/account_model';
import Account from '../../database/models/account_model';
import constants from '../../utils/constants';

const getAccounts = async (req: Request, res: Response) => {
  const { id } = req.user;

  try {
    const accounts = await Account.findAll({
      where: {
        userId: id,
      },
    });

    res.status(200).json(accounts);
  } catch (error) {
    handleErrors(res, error);
  }
};

const getAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const entry = await Account.findByPk(id);

    if (entry) {
      res.status(200).json(entry);
    } else {
      throw new Error(constants.accountNotFound.msg);
    }
  } catch (error) {
    handleErrors(res, error);
  }
};

const postAccount = async (req: Request, res: Response) => {
  const { id } = req.user;
  const body = req.body as AccountOutput;

  const data = {
    name: body.name,
    isCredit: body.isCredit,
    userId: id,
  } as AccountOutput;

  try {
    const account = Account.build(data);
    await account.save();

    res.status(201).json(account);
  } catch (error) {
    handleErrors(res, error);
  }
};

// const putEntry = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const body = req.body as EntryOutput;

//   const entry = await Entry.findByPk(id);

//   const data = {
//     concept: body.concept ?? entry?.concept,
//     note: body.note ?? entry?.note,
//     isCredit: body.amount ?? entry?.amount,
//     type: body.type ?? entry?.type,
//     quoted: body.quoted ?? entry?.quoted,
//     isFulfilled: body.isFulfilled ?? entry?.isFulfilled,
//     current: body.current ?? entry?.current,
//     from: body.from ?? entry?.from,
//     to: body.to ?? entry?.to,
//     group: body.group ?? entry?.group,
//     period: new Date(body.date).toLocaleDateString() ?? entry?.date,
//     date: body.date ?? entry?.date,
//   } as EntryOutput;

//   try {
//     await entry?.update(data);
//     res.status(200).json(entry);
//   } catch (error) {
//     handleErrors(res, error);
//   }
// };

// const deleteEntry = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const entry = await Entry.findByPk(id);

//     await entry?.destroy();
//     res.status(200).json(entry);
//   } catch (error) {
//     handleErrors(res, error);
//   }
// };

export default {
  getAccounts,
  getAccount,
  // putEntry,
  postAccount,
  // deleteEntry,
};

import { Request, Response } from 'express';
import { Entry } from '../../database/models';
import handleErrors from '../../helpers/handle-errors';
import { EntryOutput } from '../../database/models/entry_model';
import constants from '../../utils/constants';

const getEntries = async (req: Request, res: Response) => {
  const { id } = req.user;

  try {
    const entries = await Entry.findAll({
      limit: 10,
      where: {
        userId: id,
      },
      attributes: ['id', 'concept', 'amount', 'type', 'date'],
      // include: [
      //   {
      //     model: Category,
      //     attributes: ['name', 'id'],
      //   },
      // ],
      order: [['date', 'DESC']],
    });

    const allEntries = await Entry.findAll({
      attributes: ['amount', 'type'],
      where: {
        userId: id,
      },
    });

    let totalExpenses = 0;
    let totalIncomes = 0;

    allEntries
      .filter((e) => e.type === 'income')
      .forEach((item) => {
        totalIncomes += item.amount;
      });

    allEntries
      .filter((e) => e.type === 'expense')
      .forEach((item) => {
        totalExpenses += item.amount;
      });

    const balance = totalIncomes - totalExpenses;

    res.status(200).json({
      entries,
      balance,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

const getEntry = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const entry = await Entry.findByPk(id);

    res.status(200).json(entry);
  } catch (error) {
    handleErrors(res, error);
  }
};

const postEntry = async (req: Request, res: Response) => {
  const { id } = req.user;
  const body = req.body as EntryOutput;

  const data: EntryOutput = {
    concept: body.concept,
    note: body.note,
    amount: body.amount,
    type: body.type,
    quoted: body.quoted,
    isFulfilled: body.isFulfilled,
    current: body.current,
    from: body.from,
    to: body.to,
    group: body.group,
    period: new Date(body.date).toLocaleDateString(),
    date: body.date,
    userId: id,
    accountId: body.accountId,
    destinationId: body.destinationId,
  };

  try {
    const entry = Entry.build(data);
    await entry.save();

    res.status(201).json(entry);
  } catch (error) {
    handleErrors(res, error);
  }
};

const putEntry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body as EntryOutput;

  const entry = await Entry.findByPk(id);

  const data = {
    concept: body.concept ?? entry?.concept,
    note: body.note ?? entry?.note,
    amount: body.amount ?? entry?.amount,
    type: body.type ?? entry?.type,
    quoted: body.quoted ?? entry?.quoted,
    isFulfilled: body.isFulfilled ?? entry?.isFulfilled,
    current: body.current ?? entry?.current,
    from: body.from ?? entry?.from,
    to: body.to ?? entry?.to,
    group: body.group ?? entry?.group,
    period: new Date(body.date).toLocaleDateString() ?? entry?.date,
    date: body.date ?? entry?.date,
    accountId: body.accountId ?? body.accountId,
  } as EntryOutput;

  try {
    if (entry) {
      await entry.update(data);
      res.status(200).json(entry);
    } else {
      throw new Error(constants.entryNotFound.msg);
    }
  } catch (error) {
    handleErrors(res, error);
  }
};

const deleteEntry = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const entry = await Entry.findByPk(id);

    if (entry) {
      await entry?.destroy();
      res.status(200).json(entry);
    } else {
      throw new Error(constants.entryNotFound.msg);
    }
  } catch (error) {
    handleErrors(res, error);
  }
};

export default {
  getEntries,
  getEntry,
  putEntry,
  postEntry,
  deleteEntry,
};

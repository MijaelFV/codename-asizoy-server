import { Request, Response } from 'express';
import { Entry } from '../../database/models';
import handleErrors from '../../helpers/handle-errors';
import { EntryOutput } from '../../database/models/entry_model';

// const getEntries = async (req: Request, res: Response) => {
//   const { id } = req.user;

//   try {
//     const entries = await Entry.findAll({
//       limit: 10,
//       where: {
//         userId: id,
//       },
//       attributes: ['id', 'concept', 'amount', 'type', 'date'],
//       // include: [
//       //   {
//       //     model: Category,
//       //     attributes: ['name', 'id'],
//       //   },
//       // ],
//       order: [['date', 'DESC']],
//     });

//     const allEntries = await Entry.findAll({
//       attributes: ['amount', 'type'],
//       where: {
//         userId: id,
//       },
//     });

//     let totalExpenses = 0;
//     let totalIncomes = 0;

//     allEntries
//       .filter((e) => e.type === 'income')
//       .forEach((item) => {
//         totalIncomes += item.amount;
//       });

//     allEntries
//       .filter((e) => e.type === 'expense')
//       .forEach((item) => {
//         totalExpenses += item.amount;
//       });

//     const balance = totalIncomes - totalExpenses;

//     res.status(200).json({
//       entries,
//       balance,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: 'Contact the administrator',
//     });
//   }
// };

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
  // const { id } = req.user;
  const { concept, amount, type } = req.body as EntryOutput;

  // const testCuotas = {
  //   concept: 'Televisor Samsung',
  //   categories: ['Tecnologia', 'Programacion'],
  //   payments: [
  //     {
  //       type: 'credit',
  //       amount: 2500,
  //       date: '18/10/22',
  //     },
  //     {

  //       amount: 3000,
  //       date: '18/10/22',
  //     },
  //     {
  //       amount: 3000,
  //       date: '18/10/22',
  //     },
  //   ],
  // };

  // try {
  //   const entry = Entry.build({ concept, amount, type, date });
  //   await entry.save();

  //   res.status(201).json(entry);
  // } catch (error) {
  //   handleErrors(res, error);
  // }
};

// const putEntry = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { concept, amount, category, date } = req.body;

//   try {
//     const entry = await Entry.findByPk(id);

//     const data = {
//       concept: concept || entry.concept,
//       amount: amount || entry.amount,
//       categoryId: category || entry.categoryId,
//       date: date || entry.date,
//     };

//     await entry.update(data);
//     res.status(200).json(entry);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: 'Contact the administrator',
//     });
//   }
// };

// const deleteEntry = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const entry = await Entry.findByPk(id);

//     await entry.destroy();
//     res.status(200).json(entry);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: 'Contact the administrator',
//     });
//   }
// };

export default {
  // getEntries,
  getEntry,
  // putEntry,
  postEntry,
  // deleteEntry,
};

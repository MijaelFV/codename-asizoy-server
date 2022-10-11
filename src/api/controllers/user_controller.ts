import { Request, Response } from 'express';
import { User } from '../../database/models';
import generateJWT from '../../helpers/generate-jwt';
import bcryptjs from 'bcryptjs';
import handleErrors from '../../helpers/handle-errors';

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

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    res.status(200).json(user);
  } catch (error) {
    handleErrors(res, error);
  }
};

const postUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  let { email, password } = req.body;

  email = email.toLowerCase();

  try {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);

    const user = User.build({ name, email, password });
    await user.save();

    // JsonWebToken
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({ user, token });
  } catch (error) {
    handleErrors(res, error);
  }
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
  getUser,
  // putEntry,
  postUser,
  // deleteEntry,
};

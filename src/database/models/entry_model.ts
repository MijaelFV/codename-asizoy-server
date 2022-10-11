import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';

enum entryType {
  income = 'income',
  expense = 'expense',
}

interface EntryAttributes {
  /* Caso 1
    concept: Zapas en 12 cuotas
    note: Se lo compre a una vieja por mercado libre
    amount: 25000
    type: expense
    categories: [Ropa]
    tags: [MercadoLibre]
    account: Banco BBVA - Caja de ahorro ARS  / VISA BBVA(isCredit) / DEBITO BBVA
    quoted: (Account.isCredit)
    current: 1 
    from: 1
    to: 12
    group: z1
    period: JAN-22
    createdAt: 05-01-2022
  */

  concept: string;
  note: string;
  amount: number;
  type: entryType;
  quoted: boolean;
  // categories?: Category[];
  // tags?: Tag[];
  // account?: Account;
  // destination?: Destination;
  isFulfilled: boolean;
  current?: number;
  from?: number;
  to?: number;
  group?: string;
  period: string;
  date: Date;
  // userId: User;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
// export type EntryInput = Optional<EntryAttributes>;
export type EntryOutput = Required<EntryAttributes>;

class Entry extends Model<EntryAttributes> implements EntryAttributes {
  public id!: number;
  public concept!: string;
  public note!: string;
  public amount!: number;
  public type!: entryType;
  public quoted!: boolean;
  // public categories: Category;
  // public tags: Tag;
  // public account: Account;
  // public destination: Desstination;
  public isFulfilled!: boolean;
  public current?: number;
  public from?: number;
  public to?: number;
  public group?: string;
  public period!: string;
  public date!: Date;

  // relations
  public readonly userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Entry.init(
  {
    concept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM({ values: Object.keys(entryType) }),
      allowNull: false,
    },
    quoted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isFulfilled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    current: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    from: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    group: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  },
);

export default Entry;


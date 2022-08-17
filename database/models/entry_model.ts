import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';

interface EntryAttributes {
  // id: number;
  concept: string;
  amount: number;
  type: string;
  // bank?: string;
  // card?: string;
  // category: string;
  date: Date;
  // firstDue: Date;
  // lastDue: Date;
  // dueDate: Date;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
// export type EntryInput = Optional<EntryAttributes>;
export type EntryOuput = Required<EntryAttributes>;

class Entry extends Model<EntryAttributes> implements EntryAttributes {
  public concept!: string;
  public amount!: number;
  public type!: string;
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
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


import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';

interface CardAttributes {
  // id: number;
  name: string;
  balance: number;
  type: string;
  // bank: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
// export type CardInput = Optional<CardAttributes>;
export type CardOuput = Required<CardAttributes>;

class Card extends Model<CardAttributes> implements CardAttributes {
  public name!: string;
  public balance!: number;
  public type!: string;
  public date!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Card.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
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

export default Card;


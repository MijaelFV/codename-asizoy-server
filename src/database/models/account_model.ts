import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';

interface AccountAttributes {
  name: string;
  balance: number;
  isCredit: boolean;
  // closure?: Date;
  // minFee?: number;
  // totalFee?: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
// export type AccountInput = Optional<AccountAttributes>;
export type AccountOutput = Required<AccountAttributes>;

class Account extends Model<AccountAttributes> implements AccountAttributes {
  public id!: number;
  public name!: string;
  public balance!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Account.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  },
);

export default Account;


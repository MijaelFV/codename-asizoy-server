import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../config';

interface EntryAttributes {
  // id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
// export type EntryInput = Optional<EntryAttributes>;
export type EntryOuput = Required<EntryAttributes>;

class Entry extends Model<EntryAttributes> implements EntryAttributes {
  public name!: string;
  public email!: string;
  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Entry.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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


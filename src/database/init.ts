import { Account, Entry, User } from './models';

const dbInit = () => {
  User.hasMany(Entry, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: { name: 'userId', allowNull: false } });
  Entry.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

  User.hasMany(Account, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: { name: 'userId', allowNull: false } });
  Account.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

  Account.hasMany(Entry, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: { name: 'accountId', allowNull: false } });
  Entry.belongsTo(Account, { foreignKey: { name: 'accountId', allowNull: false } });
};

export default dbInit;


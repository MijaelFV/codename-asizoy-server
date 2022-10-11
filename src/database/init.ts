import { Bank, Card, Entry, User } from './models';

const dbInit = () => {
  User.hasMany(Entry, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: { name: 'userId', allowNull: false } });
  Entry.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

  Entry.hasOne(Bank, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: { name: 'userId', allowNull: false } });
  Bank.belongsTo(Entry, { foreignKey: { name: 'userId', allowNull: false } });

  User.hasMany(Card, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: { name: 'userId' } });
  Card.belongsTo(User, { foreignKey: { name: 'userId' } });

  User.sync();
  Entry.sync();
  Bank.sync();
  Card.sync();
};

export default dbInit;


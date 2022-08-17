import Entry from './entry_model';
// import User from './user_model';
// import Card from './card_model';

// Create asociations
// User.hasMany(Entry, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: { name: 'userId', allowNull: false } });
// Entry.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

// User.hasMany(Category, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: { name: 'userId', allowNull: false } });
// Category.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

// Category.hasMany(Entry, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: { name: 'categoryId' } });
// Entry.belongsTo(Category, { foreignKey: { name: 'categoryId' } });

// // Database sync
// db.sync();

export { Entry };


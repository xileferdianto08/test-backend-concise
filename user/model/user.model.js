const { sq } = require('../../database/config')
const { DataTypes } = require("sequelize");
const User_groupDB = require('./user_group.model')
const TaskDB = require('../../task/model/task.model')
const GroupDB = require('../../group/model/group.model')

const User = sq.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

User.belongsToMany(GroupDB, { through: 'user_group', onUpdate:'CASCADE', onDelete: 'CASCADE' })
GroupDB.belongsToMany(User, {through:'user_group', onUpdate:'CASCADE', onDelete: 'CASCADE'})
User.hasMany(TaskDB, { foreignKey:'user_id', onUpdate:'CASCADE', onDelete: 'CASCADE' })
TaskDB.belongsTo(User, { foreignKey:'user_id', onUpdate:'CASCADE', onDelete: 'CASCADE' })

module.exports = User
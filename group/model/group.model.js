const { sq } = require('../../database/config')
const { DataTypes } = require("sequelize");
const UserDB = require('../../user/model/user.model')
const User_groupDB = require('../../user/model/user_group.model');

const Group = sq.define('group', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    },  
    {
    timestamps: false,
    freezeTableName: true,
  }
)


module.exports = Group
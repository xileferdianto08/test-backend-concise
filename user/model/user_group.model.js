const { sq } = require("../../database/config");
const { DataTypes } = require("sequelize");
const UserDB = require("./user.model");
const GroupDB = require("../../group/model/group.model");

const User_group = sq.define(
  "user_group",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserDB,
        key: "id",
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: GroupDB,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);


module.exports = User_group;

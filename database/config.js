const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URI, {
  timezone:'+07:00'
})

const testDbConnection = () => {
  return sequelize.authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};

module.exports = {sq:sequelize, testDbConnection}
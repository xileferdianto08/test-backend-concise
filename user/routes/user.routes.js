const controller = require("../controller/user.controller");

module.exports = function (app) {
  app.get("/user", controller.getAllData);
  app.get("/user/:id", controller.getDataById);
  app.post("/user", controller.addNewUser);
  app.put("/user/:id", controller.updateUser);
  app.delete("/user/:id", controller.deleteUser);
};

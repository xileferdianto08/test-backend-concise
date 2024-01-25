const TaskDB = require("../model/task.model");
const UserDB = require("../../user/model/user.model");

// List All Task
exports.getAllData = (req, res) => {
  TaskDB.findAll()
    .then((data) => {
      return res.status(200).send({
        message: "Data Successfully Retrieved",
        data,
      });
    })
    .catch((error) => {
      console.error("Error on: ", error.message);
      return res.status(500).send({
        message: "An error has occured!",
      });
    });
};

// Get Task data by ID (complete with user data who handle the task)
exports.getDataByTaskId = (req, res) => {
  const { id } = req.params;

  TaskDB.findAll({ where: { id }, include: [UserDB] })
    .then((data) => {
      if (!data[0]) {
        return res.status(200).send({
          message: "Data not available!",
        });
      }

      return res.status(200).send({
        message: "Data successfully retrieved",
        data,
      });
    })
    .catch((error) => {
      console.error("Error on: ", error.message);
      return res.status(500).send({
        message: "An error has occured!",
      });
    });
};

// Get User data by ID (complete with task data)
exports.getDataByUserId = (req, res) => {
  const { userId } = req.params;

  UserDB.findAll({ where: { id: userId }, include: [TaskDB] })
    .then((data) => {
      console.log(data[0]["tasks"].length);
      if (!data[0]) {
        return res.status(200).send({
          message: "Data not available!",
        });
      }

      return res.status(200).send({
        message: "Data successfully retrieved",
        data,
      });
    })
    .catch((error) => {
      console.error("Error on: ", error.message);
      return res.status(500).send({
        message: "An error has occured!",
      });
    });
};

// Create Task
exports.addNewTask = (req, res) => {
  const { name, deadline, user_id } = req.body;

  UserDB.findAll({
    where: { id: user_id },
  })
    .then((userData) => {
      if (!userData[0]) {
        return res.status(200).send({
          message: "User's data not found!",
        });
      }
      TaskDB.create({
        id: null,
        name,
        deadline: new Date(deadline),
        user_id,
      })
        .then(() => {
          return res.status(200).send({
            message: `Task has been created and assigned for ${userData[0]["name"]}`,
          });
        })
        .catch((error) => {
          console.error("Error on: ", error);
          return res.status(500).send({
            message: "An error has occured!",
          });
        });
    })
    .catch((error) => {
      console.error("Error on: ", error.message);
      return res.status(500).send({
        message: "An error has occured!",
      });
    });
};

// Update Task by ID (update user_id here)
exports.updateTask = (req, res) => {
  const { user_id } = req.body;
  const { id } = req.params;

  TaskDB.findAll({
    where: { id },
  }).then((data) => {
    if (!data[0]) {
      return res.status(200).send({
        message: "Data not available!",
      });
    }

    UserDB.findAll({
      where: { id: user_id },
    })
      .then((userData) => {
        if (!userData[0]) {
          return res.status(200).send({
            message: "User's data not found!",
          });
        }

        TaskDB.update({ user_id }, { where: { id } })
          .then(() => {
            return res.status(200).send({
              message: `Task ${data[0]["name"]} has been updated for ${userData[0]["name"]}`,
            });
          })
          .catch((error) => {
            console.error("Error on: ", error.message);
            return res.status(500).send({
              message: "An error has occured!",
            });
          });
      })
      .catch((error) => {
        console.error("Error on: ", error.message);
        return res.status(500).send({
          message: "An error has occured!",
        });
      });
  });
};

// Delete Task by ID
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  TaskDB.findAll({
    where: { id },
  })
    .then((data) => {
      if (!data[0]) {
        return res.status(200).send({
          message: "Data not found!",
        });
      }

      TaskDB.destroy({ where: { id } })
        .then(() => {
          return res.status(200).send({
            message: "Task successfully deleted!",
          });
        })
        .catch((error) => {
          console.error("Error on: ", error.message);
          return res.status(500).send({
            message: "An error has occured!",
          });
        });
    })
    .catch((error) => {
      console.error("Error on: ", error.message);
      return res.status(500).send({
        message: "An error has occured!",
      });
    });
};

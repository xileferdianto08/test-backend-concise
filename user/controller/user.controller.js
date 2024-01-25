const UserDB = require("../model/user.model");
const GroupDB = require("../../group/model/group.model");

//List All User
exports.getAllData = (req, res) => {
  UserDB.findAll()
    .then((data) => {
      return res.status(200).send({
        message: "Data successfully retrieved",
        data,
      });
    })
    .catch((error) => {
      console.error('Error on: ', error.message);
      return res.status(500).send({
        message: "An error has occured",
      });
    });
};


//Get User data by ID (complete with user's group data)
exports.getDataById = (req, res) => {
  const { id } = req.params;

  UserDB.findAll({
    where: {
      id,
    },
    include: [{ model: GroupDB, through: "User_Group" }],
  })
    .then((data) => {
      if(!data[0]) {
        return res.status(200).send({
          message: "Data not available!",
        })
      }
      return res.status(200).send({
        message: "Data successfully retrieved",
        data,
      });
    })
    .catch((error) => {
      console.error('Error on: ', error.message);
      return res.status(500).send({
        message: "An error has occured",
      });
    });
};

// Create User
exports.addNewUser = (req, res) => {
  const { name, email, phone_number, address } = req.body;

  UserDB.create({
    id: null,
    name,
    email,
    phone_number,
    address,
  })
    .then(() => {
      return res.status(200).send({
        message: "Data successfully created",
      });
    })
    .catch((error) => {
      console.error('Error on: ', error.message);
      return res.status(500).send({
        message: "An error has occured",
      });
    });
};

// Update User by ID
exports.updateUser = (req, res) => {
  const { name, email, phone_number, address } = req.body;
  const { id } = req.params;

  UserDB.findAll({
    where: {
      id,
    },
  })
    .then((data) => {
      if (!data[0]) {
        return res.status(200).send({
          message: "Data not found!",
        });
      }

      UserDB.update({ name, email, phone_number, address }, { where: { id } })
        .then(() => {
          return res.status(200).send({
            message: "Data successfully updated",
          });
        })
        .catch((error) => {
          console.error('Error on: ', error.message);
          return res.status(500).send({
            message: "An error has occured",
          });
        });
    })
    .catch((error) => {
      console.error('Error on: ', error.message);
      return res.status(500).send({
        message: "An error has occured",
      });
    });
};

// Delete User by ID
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  UserDB.findAll({
    where: { id },
  })
    .then((data) => {
      if (!data[0]) {
        return res.status(200).send({
          message: "Data not found!",
        });
      }

      UserDB.destroy({ where: { id } })
        .then(() => {
          return res.status(200).send({
            message: "Data successfully deleted",
          });
        })
        .catch((error) => {
          console.error('Error on: ', error.message);
          return res.status(500).send({
            message: "An error has occured",
          });
        });
    })
    .catch((error) => {
      console.error('Error on: ', error.message);
      return res.status(500).send({
        message: "An error has occured",
      });
    });
};

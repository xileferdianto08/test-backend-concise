const GroupDB = require('../model/group.model')
const UserDB = require("../../user/model/user.model");

// List All Group
exports.getAllData = (req, res) => {
  GroupDB.findAll()
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

// Get Group data by ID (complete with users data in that group)
exports.getDataById = (req, res) => {
  const { id } = req.params;

  GroupDB.findAll({
    where: {
      id,
    },
    include: [{ model: UserDB, through: "User_Group" }],
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

// Create Group
exports.addNewGroup = (req, res) => {
  const { name, description } = req.body;

  GroupDB.create({
    id: null,
    name,
    description
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

// Update Group by ID
exports.updateGroup = (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  GroupDB.findAll({
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

      GroupDB.update({ name, description }, { where: { id } })
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

// Delete Group by ID
exports.deleteGroup = (req, res) => {
  const { id } = req.params;

  GroupDB.findAll({
    where: { id },
  })
    .then((data) => {
      if (!data[0]) {
        return res.status(200).send({
          message: "Data not found!",
        });
      }

      GroupDB.destroy({ where: { id } })
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

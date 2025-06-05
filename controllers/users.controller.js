const { selectUsers } = require("../models/users.model");

const getUsers = async (request, response, next) => {
  try {
    const users = await selectUsers();
    response.status(200).send({ users });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };

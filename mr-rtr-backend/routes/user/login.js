const UserService = require("../../services/UserService");

const login = async (req, res, next) => {
  await UserService.login(req, res, next);
};
module.exports = login;

const UserService = require("../../services/UserService");

const signUp = async (req, res, next) => {
  await UserService.signUp(req, res, next);
};
module.exports = signUp;

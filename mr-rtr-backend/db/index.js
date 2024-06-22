// config.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mr_rtr', 'newuser', 'newpassword', {
  dialect: 'postgres',
});

module.exports = sequelize;

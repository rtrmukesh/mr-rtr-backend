// config.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize('myProject', 'postgres', 'newpassword', {
  dialect: 'postgres',
});

module.exports = sequelize;

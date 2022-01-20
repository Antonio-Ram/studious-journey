const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize('profiles_db', 'root', 'Theprotigy15!', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;

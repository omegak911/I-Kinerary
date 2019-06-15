import Sequelize from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize('ikinerary', process.env.USERNAME || 'root', process.env.PASSWORD || '', {
  host: process.env.DB_URL || 'localhost',
  dialect: 'mysql',
  logging: false
})

sequelize
  .authenticate()
  .then(() => console.log('MySQL db "ikinerary" connected successfully'))
  .catch(err => 'Error connection to db "ikinerary": ' + err);

export default sequelize;
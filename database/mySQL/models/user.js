import sequelize from '../index';
import Sequelize from 'sequelize';

const User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default User;
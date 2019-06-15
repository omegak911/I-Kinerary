import sequelize from '../index';
import Sequelize from 'sequelize';

const Trip = sequelize.define('trips', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  privacy: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  start_date: {
    type: Sequelize.DATE, //yyyy-mm-dd
    allowNull: false
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  route_socket_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  comment_socket_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
});

export default Trip;
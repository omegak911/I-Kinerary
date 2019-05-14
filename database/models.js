import sequelize from './index';
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
    type: Sequelize.DATE,
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
    allowNull: false
  },
  comment_socket_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

const Route = sequelize.define('routes', {
  stops: {
    type: Sequelize.ARRAY,
    defaultValue: []
  },
  trip_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Route.belongsTo(Trip, { foreignKey: 'trip_id' });

export { Trip, Route };
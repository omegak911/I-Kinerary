import sequelize from '../index';
import Sequelize from 'sequelize';

import User from './user';
import Trip from './trip';

const UserTrip = sequelize.define('user_trip', {}, { timestamps: false });

Trip.belongsToMany(User, { through: UserTrip });
User.belongsToMany(Trip, { through: UserTrip });

if (process.env.NODE_ENV !== 'jest') {
  User.sync();
  Trip.sync();
  UserTrip.sync();
}

export {
  Trip,
  User,
  UserTrip
}
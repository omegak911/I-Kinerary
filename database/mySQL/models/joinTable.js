import sequelize from '../index';
import Sequelize from 'sequelize';

import User from './user';
import Trip from './trip';

const UserTrip = sequelize.define('user_trip', {}, { timestamps: false });

Trip.belongsToMany(User, { through: UserTrip, as: 'trip_id'});
User.belongsToMany(Trip, { through: UserTrip, as: 'user_id'});

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
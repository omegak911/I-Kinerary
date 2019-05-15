import { Trip, Stop } from '../models';
import sequelize from '../index';

sequelize.sync({ force: true })
  .then(() => {
    //seed data
  })

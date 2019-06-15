import { User, Trip } from '../models/joinTable';

const createUserHelper = ({ username }) =>
  User.create({ username });

const getUserHelper = ({ username }) =>
  User.findOne({ 
    where: { username },
    include: [{
      model: Trip
    }],
  });

export { createUserHelper, getUserHelper };
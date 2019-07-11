import { User, Trip } from '../models/joinTable';

const createUserHelper = ({ email }) =>
  User.create({ username: email, email });

const getUserHelper = ({ username }) =>
  User.findOne({ 
    where: { username },
    include: [{
      model: Trip
    }],
  });

export { createUserHelper, getUserHelper };
import { User, Trip } from '../models/joinTable';

const createUserHelper = ({ email }) =>
  User.create({ username: email, email });

const getUserHelper = ({ email }) =>
  User.findOne({ 
    where: { email },
    include: [{
      model: Trip
    }],
  });

export { createUserHelper, getUserHelper };
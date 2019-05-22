import { User } from '../models/joinTable';

const createUserHelper = ({ username }) =>
  User.create({ username });

const getUserHelper = ({ username }) =>
  User.findOne({ where: { username }});

export { createUserHelper, getUserHelper };
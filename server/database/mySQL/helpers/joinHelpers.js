import { UserTrip } from '../models/joinTable';

const createUserTripHelper = (userId, tripId) =>
  UserTrip.create({ userId, tripId });

export { createUserTripHelper };
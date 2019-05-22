import express from 'express';
import { createTrip, getTrip, updateOrCreateRoute, createUser, getUser } from './controller';

const router = express.Router();

router.route('/auth')
  .get(getUser)
  .post(createUser);

router.route('/trip')
  .get(getTrip)
  .post(createTrip)

router.route('/route')
  .post(updateOrCreateRoute)
  .patch(updateOrCreateRoute) //Have not tested this

export default router;
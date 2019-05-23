import express from 'express';
import { createTrip, getRoute, updateOrCreateRoute, createUser, getUser } from './controller';

const router = express.Router();

router.route('/auth')
  .get(getUser)
  .post(createUser);

router.route('/trip')
  .post(createTrip)

router.route('/route')
  .get(getRoute)
  .post(updateOrCreateRoute)
  .patch(updateOrCreateRoute)

export default router;
import express from 'express';
import { createTrip, getRoute, updateOrCreateRoute, createUser, getUser } from './controller';
import getPlaces from './googleApiController';

const router = express.Router();

router.route('/auth')
  .get(getUser)
  .post(createUser);

router.route('/trip')
  .post(createTrip);

router.route('/route')
  .get(getRoute)
  // .post(updateOrCreateRoute)
  .patch(updateOrCreateRoute);

router.route('/google/places')
  .get(getPlaces);

export default router;
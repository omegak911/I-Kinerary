import express from 'express';
import passport from 'passport';

import { createTrip, getRoute, updateOrCreateRoute, signup, login, createComment } from './controller';
import getPlaces from './googleApiController';

const router = express.Router();

router.route('/auth/signup')
  .post(signup);

router.route('/auth/login')
  .post(
    passport.authenticate('google-token'),
    login
  );

router.route('/trip')
  .post(createTrip);

router.route('/route/comments')
  .post(createComment);

router.route('/route')
  .get(getRoute)
  // .post(updateOrCreateRoute)
  .patch(updateOrCreateRoute);

router.route('/google/places')
  .get(getPlaces);

export default router;
import express from 'express';
import passport from 'passport';

import { createTrip, getRoute, updateOrCreateRoute, signup, login, createComment } from './components/controller';
import getPlaces from './components/googleApiController';
import { validateSession } from './components/sessions';

const router = express.Router();

router.use('/auth', passport.authenticate('google-token'));

router.route('/auth/signup')
  .post(signup);

router.route('/auth/login')
  .post(login);

router.use(validateSession)//  => sessinos middleware

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
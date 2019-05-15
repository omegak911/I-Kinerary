import express from 'express';
import { createTrip, getTrip, updateOrCreateRoute } from './controller';

const router = express.Router();

router.route('/trip')
  .get(getTrip)
  .post(createTrip)

router.route('/route')
  .post(updateOrCreateRoute)
  .patch(updateOrCreateRoute) //Have not tested this

export default router;
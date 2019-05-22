import { createRouteHelper, getRouteHelper } from '../database/mongoDB/dbHelpers';
import { createTripHelper, getTripHelper } from '../database/mySQL/helpers/tripHelper';
import { createUserHelper, getUserHelper } from '../database/mySQL/helpers/userHelper';
import { createUserTripHelper } from '../database/mySQL/helpers/joinHelpers';

const errorHandler = (err, res) => {
  console.error(err);
  res.status(404).send('request failed');
};

const createUser = (req, res) => {
  createUserHelper(req.body)
    .then(() => res.status(200).send('success'))
    .catch(err => errorHandler(err,res))
}

const getUser = (req, res) => {
  getUserHelper(req.query)
    .then(user => res.status(200).send(user)) //sends back user with all trips data
    .catch(err => errorHandler(err,res))
}

const getTrip = (req, res) => { //gets one trip data along with routes
  getTripHelper(req.query)
    .then(trip => res.status(200).send(trip))
    .catch(err => errorHandler(err,res));
}

const createTrip = (req, res) => {
  let userId;
  getUserHelper(req.body) //username
    .then(user => userId = user.dataValues.id)
    .then(async () => await createTripHelper(req.body))
    .then(async (trip) => await createUserTripHelper(userId, trip.dataValues.id))
    .then(() => res.status(201).send('success'))
    .catch(err => errorHandler(err,res));
}

const updateOrCreateRoute = (req, res) => {
  createRouteHelper(req.body)
    .then(() => res.status(201).send('success'))
    .catch(err => errorHandler(err,res));
}

export { createTrip, getTrip, updateOrCreateRoute, createUser, getUser };
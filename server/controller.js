import { createRouteHelper, getRouteHelper } from './database/mongoDB/dbHelpers';
import createTripHelper from './database/mySQL/helpers/tripHelper';
import { createUserHelper, getUserHelper } from './database/mySQL/helpers/userHelper';
import { createUserTripHelper } from './database/mySQL/helpers/joinHelpers';

const errorHandler = (err, res) => {
  console.error(err);
  res.status(404).send('request failed');
};

const createUser = (req, res) => {
  createUserHelper(req.body)
    .then(() => res.status(200).send('success'))
    .catch(err => errorHandler(err,res))
};

const getUser = (req, res) => {
  getUserHelper(req.query)
    .then(user => res.status(200).send(user)) //sends back user with all trips data
    .catch(err => errorHandler(err,res))
};

const getRoute = (req, res) => { //gets one trip data along with routes
  getRouteHelper(req.query)
    .then(route => res.status(200).send(route))
    .catch(err => errorHandler(err,res));
};

const createTrip = (req, res) => {
  let userId;
  getUserHelper(req.body) //username  //this will eventually be removed once we have sessions hold the Id
    .then(user => userId = user.dataValues.id) //this will eventually be removed once we have sessions hold the Id
    .then(async () => await createTripHelper(req.body))
    .then(async (trip) => { 
      let { id } = trip.dataValues;
      await createUserTripHelper(userId, id);
      return id;
    })
    .then(async (trip_id) => createRouteHelper({ trip_id, options: { waypoints: [], travelMode: 'DRIVING' }}))
    .then(() => res.status(201).send('success'))
    .catch(err => errorHandler(err,res));
};

const updateOrCreateRoute = (req, res) => {
  createRouteHelper(req.body)
    .then(() => res.status(201).send('success'))
    .catch(err => errorHandler(err,res));
};

export { createTrip, getRoute, updateOrCreateRoute, createUser, getUser };
import { createRouteHelper, getRouteHelper } from '../database/mongoDB/dbHelpers';
import { createTripHelper, getTripHelper } from '../database/mySQL/dbHelpers';

const errorHandler = (err, res) => {
  console.error(err);
  res.status(404).send('request failed');
};

const getTrip = (req, res) => {
  getTripHelper(req.query)
    .then(trip => {
      let { id } = req.query;
      getRouteHelper(id) //need to consider if there are no routes
        .then(route => {
          res.status(200).send({ trip, route });
        })
        .catch(err => errorHandler(err,res));
    })
    .catch(err => errorHandler(err,res));
}

const createTrip = (req, res) => {
  createTripHelper(req.body)
    .then(() => res.status(201).send('success'))
    .catch(err => errorHandler(err,res));
}

const updateOrCreateRoute = (req, res) => {
  createRouteHelper(req.body)
    .then(() => res.status(201).send('success'))
    .catch(err => errorHandler(err,res));
}

export { createTrip, getTrip, updateOrCreateRoute };
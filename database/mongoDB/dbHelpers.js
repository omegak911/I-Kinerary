import Route from './collections';

const createRouteHelper = ({ trip_id, origin, destination, waypoints, travelMode }) =>
  Route.update({ 
    trip_id
  }, {
    origin,
    destination,
    waypoints,
    travelMode
  }, {
    upsert: true
  })

const getRouteHelper = (trip_id) =>
  Route.findOne({ trip_id })

export { createRouteHelper, getRouteHelper };
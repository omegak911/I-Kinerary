import Route from './collections';

const createRouteHelper = ({ trip_id, options }) =>
  Route.update({ 
    trip_id
  }, 
  options, 
  {
    upsert: true
  })

const getRouteHelper = (trip_id) =>
  Route.findOne({ trip_id })

export { createRouteHelper, getRouteHelper };
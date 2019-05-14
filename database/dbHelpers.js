import { Trip, Route } from './models';

const createTripHelper = (
  { 
    title, 
    description, 
    privacy, 
    start_date, 
    end_date, 
    route_socket_id, 
    comment_socket_id 
  }) =>
    Trip.create(
      { 
        title, 
        description, 
        privacy, 
        start_date, 
        end_date, 
        route_socket_id, 
        comment_socket_id 
      }
    );

const getTripHelper = ({ id }) =>
  Trip.findOne({ where: { id }});

const upsertRouteHelper = ({ stops, trip_id }) =>
  Route.upsert({ stops, trip_id }); //update or create?

const getRouteHelper = ({ id }) =>
  Route.findOne({ where: { id }});

export { createTripHelper, getTripHelper, upsertRouteHelper, getRouteHelper };
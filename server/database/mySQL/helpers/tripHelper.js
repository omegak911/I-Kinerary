import { Trip } from '../models/joinTable';

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

export default createTripHelper;
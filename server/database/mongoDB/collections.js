import db from './index';
import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  trip_id: Number,
  waypoints: [
    {
      location: String,
      address: String,
      rating: Number,
      user_ratings_total: Number,
      types: [{
        type: String
      }],
      stopover: Boolean
    }
  ],
  comments: [
    {
      message: String,
      username: String,
      timestamp: String
    }
  ],
  travelMode: String //default DRIVING
});

const Route = mongoose.model('Route', routeSchema);

export default Route;
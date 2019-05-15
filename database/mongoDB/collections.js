import db from './index';
import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  trip_id: Number,
  origin: String,
  destination: String,
  waypoints: [
    {
      location: String,
      stopover: Boolean
    }
  ],
  travelMode: String
});

const Route = mongoose.model('Route', routeSchema);

export default Route;
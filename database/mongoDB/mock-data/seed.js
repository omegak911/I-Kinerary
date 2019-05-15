import { Trip, Stop } from '../models';
import sequelize from '../index';

sequelize.sync({ force: true })
  .then(() => {
    //seed data
  })




/*


{
    "trip_id": 1, 
    "origin": "Alhambra, CA", 
    "destination": "Santa Barbara, CA", 
    "waypoints": [
    	{
    		"location": "Los Angeles, CA",
    		"stopover": true
    	},
    	{
    		"location": "Santa Monica, CA",
    		"stopover": true
    	}
    ],
    "travelMode": "DRIVING"
}




*?
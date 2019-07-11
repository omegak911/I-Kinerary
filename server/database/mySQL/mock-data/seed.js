import path from 'path';
import SQL_connection from '../index';
import { Trip, User, UserTrip } from '../models/joinTable';

const seedData = async () => {
  await SQL_connection.sync({ force: true })
    .then( async () => { //    trips += `${title}\n${description}\n${start_date}\n${end_date}\n`;
      let start = new Date();
      await SQL_connection.query(`LOAD DATA LOCAL INFILE '${path.join(__dirname, './csv/users.csv')}' INTO TABLE users FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' (username, email)`);
      await SQL_connection.query(`LOAD DATA LOCAL INFILE '${path.join(__dirname, './csv/trips.csv')}' INTO TABLE trips FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' (title, description, start_date, end_date)`);
      await SQL_connection.query(`LOAD DATA LOCAL INFILE '${path.join(__dirname, './csv/userTrips.csv')}' INTO TABLE user_trips FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' (userId, tripId)`);
      let end = new Date();
      await console.log(`seeding data took ${Math.floor(((end - start)/1000)/60)} minutes`);
      await process.exit();
    })
    .catch((err) => console.log('error syncing database: ', err));
};

seedData();
import path from 'path';
import SQL_connection from '../index';
import { Trip, User } from '../models/joinTable';

const seedData = async () => {
  await SQL_connection.sync({ force: true })
    .then( async () => {
      console.log('db synced')
      //clean out all tables (order is important)
      let start = new Date();
      await User.truncate({ restartIdentity: true, cascade: true });
      await Trip.truncate({ restartIdentity: true, cascade: true });
      let end = new Date();
      await console.log(`deleting data from tables took ${Math.floor((end - start)/1000)} seconds`);  
    })
    .then( async () => { //    trips += `${title}\n${description}\n${start_date}\n${end_date}\n`;
      let start = new Date();
      await SQL_connection.query(`COPY users ("username") FROM '${path.join(__dirname, './csv/users.csv')}' CSV`);
      await console.log('copied users');
      await SQL_connection.query(`COPY trips ("title","description","start_date","end_date") FROM '${path.join(__dirname, './csv/trips.csv')}' DELIMITER '\t' NULL AS 'null' CSV`);
      await console.log('copied trips');
      let end = new Date();
      await console.log(`seeding data took ${Math.floor(((end - start)/1000)/60)} minutes`);
      await process.exit();
    })
    .catch((err) => console.log('error syncing database: ', err));
};

seedData();
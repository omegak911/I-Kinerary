import fs from 'fs';

const relativePath = './database/mySQL/mock-data/csv/';

const userDir = fs.createWriteStream(relativePath + 'users.csv');
const tripDir = fs.createWriteStream(relativePath + 'trips.csv');

const entries = 100;

const createUsers = () => {
  console.log('starting createUsers')
  let users = '';
  for (let i = 0; i < entries; i++) {
    let username = `Mock User #${i}`;
    users += `${username}\n`;
  }
  userDir.write(users);
  console.log('ending createUsers')
}

const createTrips = () => {
  console.log('starting createTeams')
  let trips = '';
  for (let i = 0; i < entries; i++) {
    let title = `Mock Trip #${i}`;
    let description = `Mock Description #${i}`;
    let start_date = `${i}${i}${i}${i}-${i}${i}-${i}${i}`;
    let end_date = `${i}${i}${i}${i}-${i}${i}-${i}${i}`;
    trips += `${title}\t${description}\t${start_date}\t${end_date}\n`;
  }
  tripDir.write(trips);
  console.log('ending createTeams')
}

const createSeedData = () => {
  createUsers();
  createTrips();
}

createSeedData();
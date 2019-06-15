import fs from 'fs';

const relativePath = './database/mySQL/mock-data/csv/';

const userDir = fs.createWriteStream(relativePath + 'users.csv');
const tripDir = fs.createWriteStream(relativePath + 'trips.csv');
const userTripDir = fs.createWriteStream(relativePath + 'userTrips.csv');

const entries = 100;

const createUsers = () => {
  let users = '';
  users += `Omegak911\n`
  for (let i = 0; i < entries; i++) {
    let username = `Mock User #${i}`;
    users += `${username}\n`;
  }
  userDir.write(users);
};

const createTrips = () => {
  let trips = '';
  for (let i = 0; i < entries; i++) {
    let title = `Mock Trip #${i}`;
    let description = `Mock Description #${i}`;
    let start_date = `2019-05-22`;
    let end_date = `2019-05-22`;
    trips += `${title}\t${description}\t${start_date}\t${end_date}\n`;
  }
  tripDir.write(trips);
};

const createUserTripAssociations = () => {
  let userTrips = '';
  for (let tripId = 1; tripId < entries + 1; tripId++) {
    let userIdOne = tripId % 10 === 0 ? 1 : Math.floor(Math.random() * entries) + 1;
    let userIdTwo = Math.floor(Math.random() * entries) + 1;
    if (userIdOne === userIdTwo) {
      tripId -= 1;
    } else {
      userTrips += `${userIdOne}\t${tripId}\n${userIdTwo}\t${tripId}\n`;
    }
  }
  userTripDir.write(userTrips);
}

const createSeedData = () => {
  createUsers();
  createTrips();
  createUserTripAssociations();
  console.log('create script done');
}

createSeedData();
import fs from 'fs';

const relativePath = './database/mongoDB/mock-data/tsv/';

const routeDir = fs.createWriteStream(relativePath + 'routes.tsv');

const entries = 100;

const originsDestinations = ['Los Angeles, CA', 'Las Vegas, NV', 'San Francisco, CA', 'Sedona, AZ'];
const waypoints = ['Alhambra, CA', 'Santa Monica, CA', 'San Jose, CA', 'Flagstaff, AZ'];

const createRoutes = () => {
  let routes = '';
  routes += `trip_id\torigin\tdestination\twaypoints\ttravelMode\n`
  for (let trip_id = 1; trip_id < entries + 1; trip_id++) {
    let randomIndexOne = Math.floor(Math.random() * 4);
    let randomIndexPlusOne = (randomIndexOne + 1) % 4;
    let origin = originsDestinations[randomIndexOne];
    let destination = originsDestinations[randomIndexPlusOne];
    let waypoint = `${waypoints[randomIndexOne]}|${waypoints[randomIndexPlusOne]}|`

    routes += `${trip_id}\t${origin}\t${destination}\t${waypoint}\tDRIVING\n`;
  }
  routeDir.write(routes);
};

const createSeedData = () => {
  createRoutes();
  console.log('create script done');
}

createSeedData();
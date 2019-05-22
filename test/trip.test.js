import '@babel/polyfill';
import supertest from 'supertest';

import app from '../server/index';
import { Trip, User } from '../database/mySQL/models/joinTable';
import sql_connection from '../database/mySQL/index';
import Route from '../database/mongoDB/collections';

beforeAll( async () => {
  await sql_connection.sync({ force: true });
  await User.create(
    {
      username: 'Master Jest Trip'
    }
  );
});

afterAll( async () => {
  await User.destroy({ where: { id: 1 } });
  await Trip.destroy({ where: { id: 1 } });
  await Route.deleteOne({ trip_id: 1 });
});



describe('Serverside Trip/Routes: ', () => {

  test(`POST to trip route should create one trip data + joined with user`, async () => {
    await supertest(app)
      .post(`/api/trip`)
      .send({ 
        username: 'Master Jest Trip',
        title: 'Jest Trip 1', 
        description: 'Jest Trip 1 description',
        start_date: '2019-05-15', 
        end_date: '2019-05-15'  
      });
    
    const { body, status } = await supertest(app).get(`/api/auth?username=Master Jest Trip`);
    let { title } = body.trips[0];
    expect(status).toEqual(200);
    expect(body.username).toEqual('Master Jest Trip');
    expect(title).toEqual('Jest Trip 1');
  });

  test(`POST to route should add a route to a trip`, async () => {
    await supertest(app)
      .post(`/api/route`)
      .send({
        trip_id: 1, 
        options: { 
          destination: 'Santa Barbara, CA', 
          origin: 'Alhambra, CA',
          travelMode: 'DRIVING', 
          waypoints: [
            { 
              location: 'Los Angeles, CA', 
              stopover: true 
            },
            {
              location: 'Santa Monica, CA', 
              stopover: true
            }
          ]
        }
      });

    let { trip_id, origin, waypoints } = await Route.findOne({ trip_id: 1 });
    expect(trip_id).toEqual(1);
    expect(origin).toEqual('Alhambra, CA');
    expect(waypoints[0].location).toEqual('Los Angeles, CA');
  });

  xtest(`GET to route should provide a trip's Route data`, async () => {
    console.log(3)
    // const { status } = await supertest(app).post('/search-api/team').send({ teamname: 'jestTeam' });
    // expect(status).toEqual(201);
    // await Team.findOne({ where: { teamname: 'jestTeam' }})
    //   .then(result => expect(result.teamname).toEqual('jestTeam'))
    // Team.destroy({ where: { teamname: 'jestTeam' }});
  });

});

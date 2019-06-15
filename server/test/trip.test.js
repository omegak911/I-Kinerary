import '@babel/polyfill';
import supertest from 'supertest';

import app from '../index';
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

  test('Previous POST to the trip route should create one route data',async () => {
    const { trip_id, waypoints } = await Route.findOne({ trip_id: 1 });
    expect(trip_id).toEqual(1);
    expect(waypoints.length).toEqual(0);
  })

  test(`PATCH to route should update a route to a trip + only the specfied params`, async () => {
    await supertest(app)
      .patch(`/api/route`)
      .send({
        trip_id: 1, 
        options: {
          waypoints: [
            { 
              location: 'Los Angeles, CA', 
              address: 'Los Angeles, CA',
              rating: 5,
              user_ratings_total: 500,
              types: ['jest', 'test'],
              stopover: true 
            },
            { 
              location: 'Santa Monica, CA', 
              address: 'Santa Monica, CA',
              rating: 5,
              user_ratings_total: 500,
              types: ['jest', 'test'],
              stopover: true 
            },
            { 
              location: 'Santa Barbara, CA', 
              address: 'Santa Barbara, CA',
              rating: 5,
              user_ratings_total: 500,
              types: ['jest', 'test'],
              stopover: true 
            },
            { 
              location: 'Alhambra, CA', 
              address: 'Alhambra, CA',
              rating: 5,
              user_ratings_total: 500,
              types: ['jest', 'test'],
              stopover: true 
            },
          ]
        }
      });

    let { trip_id, waypoints } = await Route.findOne({ trip_id: 1 });
    
    expect(trip_id).toEqual(1);
    expect(waypoints[0].location).toEqual('Los Angeles, CA');
    expect(waypoints.length).toEqual(4);
  });

  test(`GET to route should provide a trip's Route data`, async () => {
    const { body, status } = await supertest(app).get(`/api/route?trip_id=1`);
    let { trip_id, waypoints } = body;

    expect(status).toEqual(200);
    expect(trip_id).toEqual(1);
    expect(waypoints[1].location).toEqual('Santa Monica, CA');
    expect(waypoints.length).toEqual(4);
  });

});

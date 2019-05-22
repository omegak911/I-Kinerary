import '@babel/polyfill';
import app from '../server/index';

import { Trip, User } from '../database/mySQL/models/joinTable';
import sql_connection from '../database/mySQL/index';
import supertest from 'supertest';

import createTripHelper from '../database/mySQL/helpers/tripHelper';
import { createUserTripHelper } from '../database/mySQL/helpers/joinHelpers';

let userId;
beforeAll( async () => {
  await sql_connection.sync({ force: true });  //clean out db to ensure accurate testing
});

afterAll( async () => {
  await User.destroy({ 
    where: { 
      username: 'Master Jest'
    }
  });

  await Trip.destroy({ 
    where: { 
      title: 'test 1'
    }
  });
});

describe('Serverside Auth: ', () => {

  test(`should be able to create a new user`, async () => {
    await supertest(app).post(`/api/auth`).send({ username: 'Master Jest' }); //should eventually add id to sessions
    const { dataValues } = await User.findOne({ where: { username: 'Master Jest' }});
    expect(dataValues.username).toEqual('Master Jest');
  });

  test(`should be able to get a newly created user`, async () => {
    const { body, status } = await supertest(app).get(`/api/auth?username=Master Jest`);
    userId = body.id;
    expect(status).toEqual(200);
    expect(body.username).toEqual('Master Jest');
    expect(body.trips.length).toEqual(0);
  });

  test(`should be able to get a created user with trip information`, async () => {
    let mockData = {
      title: 'test 1',
      description: 'test 1',
      start_date: '2019-05-21',
      end_date: '2019-05-21'
    }
    
    let trip = await createTripHelper(mockData);
    await createUserTripHelper(userId, trip.id);
    const { body, status } = await supertest(app).get(`/api/auth?username=Master Jest`);
    let { id, title, stars } = body.trips[0];

    expect(status).toEqual(200);
    expect(id).toEqual(1);
    expect(title).toEqual('test 1');
    expect(stars).toEqual(0);
  });

});

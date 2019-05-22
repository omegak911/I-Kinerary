import '@babel/polyfill';
import app from '../server/index';

import { Trip, User, UserTrip } from '../database/mySQL/models/joinTable';
import sql_connection from '../database/mySQL/index';
import supertest from 'supertest';

// router.route('/auth')
//   .get(getUser)
//   .post(createUser);

beforeAll( async () => {
  await sql_connection.sync({ force: true });
});

afterAll( async () => {
  await User.destroy({ 
    where: { 
      username: 'Master Jest'
    }
  });
});

describe('Serverside Auth: ', () => {

  test(`should be able to create a new user`, async () => {
    await supertest(app).post(`/api/auth`).send({ username: 'Master Jest' }); //should eventually add id to sessions
    const { dataValues } = await User.findOne({ where: { username: 'Master Jest' }});
    expect(dataValues.username).toEqual('Master Jest');
  });

});

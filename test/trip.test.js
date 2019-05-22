import '@babel/polyfill';
import app from '../server/index';

import { Trip, User, UserTrip } from '../database/mySQL/models/joinTable';
import sql_connection from '../database/mySQL/index';
import supertest from 'supertest';

import Route from '../database/mongoDB/collections';

//RUN SEED SCRIPT BEFORE TESTING

// .get(getTrip)
// .post(createTrip)

// router.route('/route')
// .post(updateOrCreateRoute)
// .patch(updateOrCreateRoute) //Have not tested this

beforeAll( async () => {
  await sql_connection.sync({ force: true });
  await User.create(
    {
      username: 'Master Jest Trip'
    }
  );
});

afterAll( async () => {

});



describe('Serverside Trip/Routes: ', () => {
  //GET trip data along with route data
  //POST Trip then GET trip to confirm it was made
  //POST route then reach into collection to confirm it exists
  //PATCH route then reach into collection to confirm it was updated

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

  xtest('it should get an existing card from the DB', async () => {
    console.log(4)
    // await Card.create({ label: 'jestCard', description: 'jestCard', comment: 'jestCard', list: 'jestCard', board_id: 5 });
    // const { body, status } = await supertest(app).get('/search-api/card?label=jestCard');
    // expect(status).toEqual(200);
    // expect(body[0].label).toEqual('jestCard');
    // const { body: likeBody, status: likeStatus } = await supertest(app).get('/search-api/card?label=jest');
    // expect(likeStatus).toEqual(200);
    // expect(likeBody[0].label).toEqual('jestCard');
    // Card.destroy({ where: { label: 'jestCard' }});
  });

  xtest('it should update an existing card from the DB', async () => {
    console.log(5)
    // await Card.create({ label: 'jestCard', description: 'jestCard', comment: 'jestCard', list: 'jestCard', board_id: 5 });
    // const response = await supertest(app).get('/search-api/card?label=jestCard');
    // let { id } = response.body[0];
    // await expect(id).toBeGreaterThan(0);
    // await supertest(app).patch('/search-api/card').send({ id, update: { label: 'jestCard', description: 'jestCard description', comment: 'jestCard comment', list: 'jestCard list', board_id: 5 }});
    // const { body, status } = await supertest(app).get('/search-api/card?label=jestCard');
    // let card = body[0];
    // expect(status).toEqual(200);
    // expect(card.label).toEqual('jestCard');
    // expect(card.description).toEqual('jestCard description');
    // expect(card.comment).toEqual('jestCard comment');
    // expect(card.list).toEqual('jestCard list');
    // expect(card.board_id).toEqual(5);
    // await Card.destroy({ where: { label: 'jestCard' }});
  });

  xtest('it should create a card_member association when provided a member_id', async () => {
    console.log(6)
    // await Card.create({ label: 'jestCard', description: 'jestCard', comment: 'jestCard', list: 'jestCard', board_id: 5 });
    // const response = await supertest(app).get('/search-api/card?label=jestCard');
    // let { id } = response.body[0];
    // await expect(id).toBeGreaterThan(0);
    // await supertest(app).patch('/search-api/card').send({ id, update: { label: 'jestCard', description: 'jestCard', comment: 'jestCard', list: 'jestCard', board_id: 5 }, member_id: 6 });
    // const { body, status } = await supertest(app).get('/search-api/card?label=jestCard');
    // let card = body[0];
    // expect(status).toEqual(200);
    // expect(card.label).toEqual('jestCard');
    // expect(card.members[0].id).toEqual(6);
    // await Card_Member.destroy({ where: { "card_id": id }});
    // await Card.destroy({ where: { label: 'jestCard' }});
  });
});

import '@babel/polyfill';
import app from '../server/index';

import { Trip, User, UserTrip } from '../database/mySQL/models/joinTable';
import sql_connection from '../database/mySQL/index';
import supertest from 'supertest';

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

  await Trip.create(
    { 
      title: 'Jest Trip 1', 
      description: 'Jest Trip 1 description',
      start_date: '2019-05-15', 
      end_date: '2019-05-15'
    }
  );

  await UserTrip.create(
    {
      userId: 1,
      tripId: 1
    }
  );
});

afterAll( async () => {

});



describe('Serverside Trip: ', () => {
  //GET trip data along with route data
  //POST Trip then GET trip to confirm it was made
  //POST route then reach into collection to confirm it exists
  //PATCH route then reach into collection to confirm it was updated

  test(`GET to trip route should provide one trip data`, async () => {
    const { body, status } = await supertest(app).get(`/api/trip?id=1`);//should eventually be from sessions
    let { id, title, description } = body;
    expect(status).toEqual(200);
    expect(id).toEqual(1);
    expect(title).toEqual('Jest Trip 1');
    expect(description).toEqual('Jest Trip 1 description');
  });

  xtest('it should add a new board to the DB', async () => {
    console.log(2)
    // const { status } = await supertest(app).post('/search-api/board').send({ title: 'jestBoard' });
    // expect(status).toEqual(201);
    // const { body } = await supertest(app).get('/search-api/board?title=jestBoard');
    // expect(body[0].title).toEqual('jestBoard');
    // Board.destroy({ where: { title: 'jestBoard' }});
  });

  xtest('it should add a new team to the DB', async () => {
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

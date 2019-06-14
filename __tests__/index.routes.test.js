const request = require('supertest');
const server = require('../');
const { mockNewStuff, mockFalsyStuff, mockupdateStuff, mockFalsyIds } = require('../__mocks__/routes.mocks');

beforeAll(async () => {
  console.log('Tests starting!!!');
});

// --detectOpenHandles` async operations that kept running after all tests
afterAll(async (done) => {
  server.close();
  done();
  console.log('Tests finished');
});

describe('Routes testing -- status & type & body', () => {

  test('getStuff endpoint -- positive', async () => {
    const response = await request(server).get('/getStuff');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('getStuff endpoint -- negative', async () => {
    // to do

  });

  test('create endpoint -- positive', async () => {
    const response = await request(server)
      .post('/create')
      .send(mockNewStuff)
      .set('Accept', /application\/json/)
    expect(response.status).toEqual(201);
    expect(response.type).toEqual("application/json");
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("time");
    expect(response.body).toHaveProperty("picture");
    expect(response.body).toHaveProperty("tags");
    expect(response.body).toHaveProperty("updated");
    expect(Object.prototype.toString.call(new Date(response.body.time))).toEqual('[object Date]');
    expect(typeof response.body.picture).toEqual('string');
    expect(Array.isArray(response.body.tags)).toBe(true);
    expect(typeof response.body.updated).toEqual('number');
  });

  test('create endpoint -- negative', async () => {
    // to do
    const response = await request(server)
      .post('/create')
      .send(mockFalsyStuff)
      .set('Accept', /application\/json/);
    expect(response.status).toEqual(404);
    expect(response.type).toEqual("text/plain");
  });

  test('update endpoint -- positive & negative', async () => {
    const response = await request(server)
      .post('/create')
      .send(mockNewStuff)
      .set('Accept', /application\/json/);
    const id = response.body._id;
    const updateResponse = await request(server)
      .put(`/update/${id}`)
      .send(mockupdateStuff)
      .set('Accept', /application\/json/);
    expect(updateResponse.status).toEqual(200);
    expect(updateResponse.body).toHaveProperty("_id");
    expect(updateResponse.type).toEqual("application/json");
    expect(updateResponse.body).toHaveProperty("time");
    expect(updateResponse.body).toHaveProperty("picture");
    expect(updateResponse.body).toHaveProperty("tags");
    expect(updateResponse.body).toHaveProperty("updated");
    expect(updateResponse.body.picture).toEqual(mockupdateStuff.picture);
    expect(updateResponse.body).not.toHaveProperty("pizza");
    expect(Object.prototype.toString.call(new Date(updateResponse.body.time))).toEqual('[object Date]');
    expect(typeof updateResponse.body.picture).toEqual('string');
    expect(Array.isArray(updateResponse.body.tags)).toBe(true);
    expect(typeof updateResponse.body.updated).toEqual('number');
  });

  test('delete endpoint -- positive', async () => {
    const response = await request(server)
      .post('/create')
      .send(mockNewStuff)
      .set('Accept', /application\/json/)
    const deleteResponse = await request(server)
      .delete(`/delete/${response.body._id}`);
    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.body.n).toEqual(1);
  });

  test('delete endpoint -- negative', async () => {
    const deleteResponse = await request(server)
      .delete(`/delete/${mockFalsyIds.string}`);
    expect(deleteResponse.status).toEqual(404);
    expect(deleteResponse.type).toEqual("text/plain");
  });

  test('delete endpoint -- negative', async () => {
    const deleteResponse = await request(server)
      .delete(`/delete/${mockFalsyIds.ObjectId}`);
    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.body.n).toEqual(0);
  });
});

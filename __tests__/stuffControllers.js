const Stuff = require('../models/stuffModel');
const ctrl = require('../controllers/stuffControllers');
const { mockNewStuff, mockFalsyStuff, mockupdateStuff, mockFalsyIds } = require('../__mocks__/routes.mocks');

// mocking the implementation of the Stuff.find method
// staying that it returns a promise that we then resolve

jest.mock('../models/stuffModel');

describe('Controller Unit Testing -- With Mocked Stuff Model', () => {

  test('getAll Unit Test', async () => {

    // setup
    const ctx = {};
    const result = {'hi': 'there'};
    Stuff.find.mockImplementation(() => Promise.resolve(result));
    const spyFind = jest.spyOn(Stuff, 'find');

    // work
    await ctrl.getAll(ctx, ()=>{});

    // assertions/expects
    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(ctx.body).toBe(result);
    expect(ctx.status).toBe(200);
  });


  // we fixed the real implementation based on designing the test and what we've learned
  test('create Unit Test', async () => {

    // setup
    const ctx = {request: {}};
    const result = {'hi': 'there'};
    Stuff.prototype.save.mockImplementation(() => Promise.resolve(result));
    const spySave = jest.spyOn(Stuff.prototype, 'save');

    // work
    await ctrl.create(ctx, ()=>{});

    // assertions/expects
    expect(spySave).toHaveBeenCalledTimes(1);
    expect(ctx.body).toBe(result);
    expect(ctx.status).toBe(201);
  });


  test('update Unit Test', async () => {

    // setup
    const ctx = {
      request: { body: {}},
      params: {}
    };
    const result = {'hi': 'there'};
    Stuff.setFields = jest.fn(() => Promise.resolve(result));
    const spySetFields = jest.spyOn(Stuff, 'setFields');

    // work
    await ctrl.update(ctx, ()=>{});

    // assertions/expects
    expect(spySetFields).toHaveBeenCalledTimes(1);
    expect(ctx.body).toBe(result);
    expect(ctx.status).toBe(200);
  });


  test('delete Unit Test', async () => {

    // setup
    const ctx = {
      request: {},
      params: {}
    };
    const result = {'hi': 'there'};
    Stuff.remove = jest.fn(() => Promise.resolve(result));
    const spyRemove = jest.spyOn(Stuff, 'remove');

    // work
    await ctrl.delete(ctx, ()=>{});

    // assertions/expects
    expect(spyRemove).toHaveBeenCalledTimes(1);
    expect(ctx.body).toEqual(result);
    expect(ctx.status).toBe(200);
  });
});
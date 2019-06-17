const Stuff = require('../models/stuffModel');
const ctrl = require('../controllers/stuffControllers');
const { mockNewStuff, mockFalsyStuff, mockupdateStuff, mockFalsyIds } = require('../__mocks__/routes.mocks');

// mocking the implementation of the Stuff.find method
// staying that it returns a promise that we then resolve

jest.mock('../models/stuffModel');

describe('Controller Unit Testing -- With Mocked Stuff Model', () => {
  
  test('getAll Unit Test', async () => {

    // setup
    const ctx = {
      request: {
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        }
      }
    };

    Stuff.find.mockImplementation(() => Promise.resolve([]));

    const getAllSpy = jest.spyOn(ctrl, 'getAll');

    // work
    await ctrl.getAll(ctx, ()=>{});

    // assertions/expects
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(ctx, expect.any(Function));
    expect(ctx.body).toEqual([]);
    expect(ctx.status).toBe(200);
  });

  // we fixed the real implementation based on designing the test and what we've learned
  test('create Unit Test', async () => {

    // setup
    const ctx = {
      request: {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: {}
      }
    };

    Stuff.prototype.save.mockImplementation(() => Promise.resolve({'hi': 'there'}));

    const createSpy = jest.spyOn(ctrl, 'create');

    // work
    await ctrl.create(ctx, ()=>{});

    // assertions/expects
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(ctx, expect.any(Function));
    expect(ctx.body).toEqual({'hi': 'there'});
    expect(ctx.status).toBe(201);
  });
});
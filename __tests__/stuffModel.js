const Stuff = require('../models/stuffModel');


describe('Model Unit Test -- Stuff Model', () => {

  test('defaults in schema are set', async () => {

    // setup
    const fakeStuff = {
      picture: 'myPicture'
    };

    // work
    const FakeStuff = await new Stuff(fakeStuff);

    // assertions/expects
    expect(FakeStuff).toHaveProperty('picture', fakeStuff.picture);
    expect(FakeStuff).toHaveProperty('_id');
    expect(FakeStuff).toHaveProperty('time');
    expect(FakeStuff).toHaveProperty('updated');
  });


  test('schema requires the picture property', async () => {

    // setup
    const fakeStuff = {};

    // work
    const FakeStuff = await new Stuff(fakeStuff);

    // assertions/expects
    await FakeStuff.validate(err => {
      expect(err.name).toBe('ValidationError');
    })
  });


  test('sets fields if keys are defined in schema', async () => {

    // setup
    const fakeUpdate = {'picture': 'myPicture'};
    const fakeId = 42;
    const result = {'hi': 'there'};

    Stuff.findOneAndUpdate = jest.fn(() => Promise.resolve(result));

    // work
    const FakeStuff = await Stuff.setFields(fakeUpdate, fakeId);

    // assertions/expects
    expect(FakeStuff).toBe(result);
  });


  test('does not set fields if not defined in schema', async () => {

    // setup
    const fakeUpdate = {'cake': 'chocolate'};
    const fakeId = 'ensaimada';
    const result = {'hi': 'there'};

    Stuff.findOneAndUpdate = jest.fn(() => Promise.resolve(result));

    // work
    const FakeStuff = await Stuff.setFields(fakeUpdate, fakeId);

    // assertions/expects
    expect(FakeStuff).toBe(result);
  });

})
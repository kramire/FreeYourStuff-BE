const Stuff = require('../models/stuffModel')

// Refactored to use const.
module.exports.getAll = async (ctx, next) => {
  const stuffs = await Stuff.find();
  ctx.body = stuffs;
  ctx.status = 200;
}


// class StuffCrtl {
//   constructor () {
//     this.Model = sSuff;
//   }
// }

// // test.js
// const crlt = new StuffCrtl();
// fakeStuff.find = () => []
// crtl.Model = fakeStuff;

// test.js

// const ctx = {}
// Stuff.find = () => []
// ctrl.getAll(ctx, ()=>{}, Stuff)


// Refactored to use const.
// Refactored to properly catch error, or update body.
module.exports.create = async (ctx, next) => {
  const stuff = await new Stuff(ctx.request.body);

  await stuff.save()
    .then((result) => {
      ctx.body = result;
      ctx.status = 201;
    })
    .catch();
}

// Refactored to use const.
// Refactored to return updated document in response body.
// Refactored to properly catch error.
// Refactored to update only passed values, if defined in schema. Avoids setting nulls.
// Need then/catch bc callback would sometimes execute before it had result.
module.exports.update = async (ctx, next) => {
  const updates = ctx.request.body;
  const updateKeys = Object.keys(updates);
  const setObj = {};

  updateKeys.forEach(key => {
    if (Object.keys(Stuff.schema.obj).includes(key)) setObj[key] = updates[key];
  });

  await Stuff.findOneAndUpdate(
    {_id: ctx.params.id},
    {$set: setObj},
    {new: true}, ((err, updatedStuff) => err ? err : updatedStuff))
    .then((res) => {
      ctx.body = res;
      ctx.status = 200;
    })
    .catch();
}

// Refactored to use const.
// Refactored to check for OK status from remove method.
// Building test cases helped correct this controller.
module.exports.delete = async (ctx, next) => {
  const _id = ctx.params.id;
  await Stuff.remove({_id})
    .then(res => ctx.body = res)
    .catch();
}

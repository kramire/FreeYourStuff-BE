const Stuff = require('../models/stuffModel')

// Refactored to use const.
module.exports.getAll = async (ctx, next) => {
  const stuffs = await Stuff.find();
  ctx.body = stuffs;
  ctx.status = 200;
}

// Refactored to use const.
// Refactored to properly catch error, or update body.
module.exports.create = async (ctx, next) => {
  const stuff = await new Stuff(ctx.request.body);

  await stuff.save()
    .then(() => {
      ctx.body = stuff;
      ctx.status = 200;
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
module.exports.delete = async (ctx, next) => {
  const _id = ctx.params.id;
  await Stuff.remove({_id})
    .then(res => {
      if (res.ok === 1) ctx.status = 200
    })
    .catch();
}

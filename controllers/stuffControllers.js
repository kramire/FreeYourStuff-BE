const Stuff = require('../models/stuffModel')

module.exports.getAll = async (ctx, next) => {
  let stuffs = await Stuff.find()
  ctx.body = stuffs
  ctx.status = 200
  await next()
}

module.exports.create = async (ctx, next) => {
  
  let stuff = await new Stuff(ctx.request.body)
  
  try {
    await stuff.save()
  }
  catch (e) {
    ctx.status = 418
    ctx.body = e
  }
  
  await next()
  // ctx.body = stuff
  // ctx.status = 200
}

module.exports.update = async (ctx, next) => {
  let _id = ctx.params.id
  let stuff = ctx.request.body
  await Stuff.findOneAndUpdate(
    {_id},
    {$set:
      {
        time: stuff.time,
        picture: stuff.picture,
        tags: stuff.tags
      }
    },
    {new: true})
  ctx.status = 204
  await next()
}

module.exports.delete = async (ctx, next) => {
  let _id = ctx.params.id
  await Stuff.remove({_id})
  ctx.status = 204
  await next()
}

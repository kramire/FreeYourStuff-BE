const Koa = require('koa');
const app = new Koa();


const cors = require('kcors');
const bodyparser = require('koa-body');
const errorHandler = require('./errorHandler');
const router = require('./router');

app
  .use(cors())
  .use(bodyparser())
  .use(errorHandler)
  .use(router.routes());


module.exports =  app;
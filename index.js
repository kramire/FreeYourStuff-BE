require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? './.env.test' : './.env'
});
// const http = require('http');

const Koa = require('koa');
const app = new Koa();
const port = process.env.PORT || 5001;

const cors = require('kcors');
const bodyparser = require('koa-body');
const errorHandler = require('./errorHandler');
const router = require('./router');

app
  .use(cors())
  .use(bodyparser())
  .use(errorHandler)
  .use(router.routes());

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = server;


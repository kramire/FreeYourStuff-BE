require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? './.env.test' : './.env'
});
const app =  require('./');

const port = process.env.PORT || 5001;
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));
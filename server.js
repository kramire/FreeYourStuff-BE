require('dotenv').config();
const app =  require('./app');

const port = process.env.PORT || 5001;
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true
};

mongoose.connect(process.env.DATABASE, options, 
  () => console.log('Connected to mongoDB.')
);

module.exports = mongoose;
const mongoose = require('./db');

const stuffSchema = new mongoose.Schema({

  time: {
    type: Date,
    default: Date.now()
  },
  picture: {
    type: String,
    required: true
  },
  location: {
    type: Object
  },
  address: {
    type: String
  },
  tags: {
    type: [String]
  },
  updated: {
    type: Number,
    default: 0
  }
});

class StuffClass {

  static setFields(updates, id) {
    const updateKeys = Object.keys(updates);
    const setObj = {};

    updateKeys.forEach(key => {
      if (Object.keys(this.schema.obj).includes(key)) setObj[key] = updates[key];
    });

    return this.findOneAndUpdate(
      {_id: id},
      {$set: setObj},
      {new: true}, (
        (err, updatedStuff) => err ? err : updatedStuff)
      )
  }
}

stuffSchema.loadClass(StuffClass);

module.exports = mongoose.model('Stuff', stuffSchema);

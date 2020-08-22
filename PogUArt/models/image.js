const  mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  img: {
    data: {
      type: Buffer,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    }
  }
});

module.exports = Image =  mongoose.model('image', ImageSchema);

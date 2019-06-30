const mongoose = require('mongoose');
const CardDataSchema = new mongoose.Schema({
  author: {
    type: String
  },
  date: {
    type: Date
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  logo: {
    type: String
  },
  publisher: {
    type: String
  },
  title: {
    type: String
  },
  url: {
    type: String
  }
},{
  collection: 'card_info'
});

CardDataSchema.index({"description":"text", "title":"text", "url": "text"});
module.exports = mongoose.model('CardData', CardDataSchema);

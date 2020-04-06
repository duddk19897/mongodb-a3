const mongoose = require('mongoose');

// Step 1: Define our Schema
// See: https://mongoosejs.com/docs/guide.html
/*
"Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection."
*/
const definitionSchema = new mongoose.Schema(
  {
    term: String,
    definition: String,
    slug: String
  }
);

  module.exports = mongoose.model('Pictures', definitionSchema);
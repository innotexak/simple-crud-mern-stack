const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Content: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Like: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

// Compile model from schema
var Posts = mongoose.model('BlogPost', postSchema);
module.exports = Posts;

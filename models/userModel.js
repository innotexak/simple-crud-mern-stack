const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: false,
    },
    LastName: {
      type: String,
      required: false,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Token: {
      type: String,
      required: true,
    },
    isActivated: {
      type: Boolean,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
    googleId: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      default: 'default.png',
      required: false,
    },
  },
  { timestamps: true }
);

// Compile model from schema
var Users = mongoose.model('Users', userSchema);
module.exports = Users;

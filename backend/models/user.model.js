const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{type: String, ref: 'roles'}],
  wallet: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("users", usersSchema);

module.exports = User;

const mongoose = require("mongoose");
const Post = require("./post.Modle");

const userSchema = new mongoose.Schema({
  // name ==> String
  // email ==> String
  // gender ==> String
  // password ==> String
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const User = mongoose.model("user", userSchema);

module.exports = User
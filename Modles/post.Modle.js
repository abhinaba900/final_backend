const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String, // Changed from an array to a single String
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema); // Conventionally, model names are capitalized

module.exports = Post;

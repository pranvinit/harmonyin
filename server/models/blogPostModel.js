const mongoose = require("mongoose");
const blogPostShema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  images: [String],
  bodyOne: String,
  bodyTwo: String,
  category: String,
  date: String,
  time: String,
  rating: Number,
  ratingCount: Number,
});
const blogPostModel = mongoose.model("blogPost", blogPostShema);
module.exports = blogPostModel;

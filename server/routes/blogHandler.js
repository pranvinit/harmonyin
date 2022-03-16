const express = require("express");
const blogPostModel = require("../models/blogPostModel");
const blogHandler = express.Router();

blogHandler.post("/", async (req, res) => {
  const metaData = req.body;
  const postData = {
    title: metaData.title,
    author: metaData.author,
    description: metaData.description,
    bodyOne: metaData.bodyOne,
    bodyTwo: metaData.bodyTwo,
    category: metaData.category,
    date: metaData.date,
    time: metaData.time,
    rating: metaData.rating,
    ratingCount: metaData.ratingCount,
    images: metaData.images,
  };
  if (!metaData.operationType) {
    const data = await blogPostModel(postData);
    data.save();
    res.status(200).json({ message: "Form Submitted Successfully!" });
  } else if (metaData.operationType === "edit") {
    await blogPostModel.updateOne({ _id: metaData.postId }, postData);
    res.status(200).json({ message: "Post Edited Successfully!" });
  } else if (metaData.operationType === "delete") {
    await blogPostModel.deleteOne({ _id: metaData.postId }, postData);
    res.status(200).json({ message: "Post Deleted Successfully!" });
  }
});

module.exports = blogHandler;

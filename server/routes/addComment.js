const express = require("express");
const mongoose = require("mongoose");
const commentSchema = require("../models/comments");
const addComment = express.Router();

addComment.post("/", async (req, res) => {
  const data = req.body;
  const commentModel = mongoose.model(data.id, commentSchema, data.id);
  const comment = new commentModel({
    name: data.name,
    comment: data.comment,
    time: data.time,
  });
  comment.save();
  res.status(200).send();
});

module.exports = addComment;

const express = require('express');
const blogPostModel = require('../models/blogPostModel')

const blogContentHandler = express.Router();

blogContentHandler.post('/', async (req, res) => {
    let postData = req.body;
    const data = await blogPostModel.find({}).sort({ _id: -1 }).skip(postData.count).limit(4);
    res.status(200).json(data);
})

module.exports = blogContentHandler;
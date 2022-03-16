const express = require('express');
const blogPostModel = require('../models/blogPostModel')

const blogAdminHandler = express.Router();

blogAdminHandler.post('/', async (req, res) => {
    let postData = req.body;
    const data = await blogPostModel.find({ author: postData.author }).sort({ _id: -1 });
    res.status(200).json(data);
})

module.exports = blogAdminHandler;
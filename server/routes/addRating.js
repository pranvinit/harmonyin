const express = require('express');
const blogPostModel = require('../models/blogPostModel')
const addRating = express.Router();

addRating.post('/', async (req, res) => {
    const data = req.body;
    const doc = await blogPostModel.findOne({ _id: data.id })
    let rating = await doc.rating;
    let ratingCount = await doc.ratingCount;

    let totalRating = rating + parseInt(data.rating)
    doc.rating = totalRating

    let count = ratingCount + 1;
    doc.ratingCount = count;

    await doc.save()
    res.status(200).send()
})

module.exports = addRating;
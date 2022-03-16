const express = require('express');
const feedbackModel = require('../models/feedback')

const getFeedbacks = express.Router();

getFeedbacks.get('/', async (req, res) => {
    const data = await feedbackModel.find({}).sort({ _id: -1 });
    res.status(200).json(data);
})

module.exports = getFeedbacks;
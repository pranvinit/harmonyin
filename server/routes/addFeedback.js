const express = require('express');
const feedbackModel = require('../models/feedback')

const feedbackRoute = express.Router();

feedbackRoute.post('/', (req, res) => {
    const data = req.body;
    const feedback = new feedbackModel({ to: data.to, subject: data.subject, email: data.email, desc: data.desc, date: data.date, time: data.time })
    feedback.save()
    res.status(200).json({ sent: true })
})
module.exports = feedbackRoute;

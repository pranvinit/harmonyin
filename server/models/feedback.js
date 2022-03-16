const mongoose = require('mongoose')
const feedbackShema = new mongoose.Schema({
    to: String,
    subject: String,
    email: String,
    desc: String,
    date: String,
    time: String,
})
const feedbackModel = mongoose.model('feedback', feedbackShema)
module.exports = feedbackModel;
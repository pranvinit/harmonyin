const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    time: String,
})

module.exports = commentSchema;
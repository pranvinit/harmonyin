const mongoose = require('mongoose')
const authenticationSchema = new mongoose.Schema({
    username: String,
    password: String,
})
const authenticationModel = mongoose.model('authenticateUser', authenticationSchema)
module.exports = authenticationModel;
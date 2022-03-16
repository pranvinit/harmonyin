const express = require('express');
const path = require('path')
const homeHandler = express.Router();

// the / endpoint in router is relative to its path

homeHandler.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../adminCommon/index.html'))
})

module.exports = homeHandler;
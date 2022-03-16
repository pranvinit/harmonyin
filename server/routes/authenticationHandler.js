const express = require('express');
const bcrypt = require('bcrypt');
const authenticationModel = require('../models/authenticationModel')
const authenticationHandler = express.Router();

authenticationHandler.post('/', async (req, res) => {
    const { username, password } = req.body;
    const match = await authenticationModel.findOne({ username: username })
    if (match) {
        try {
            if (await bcrypt.compare(password, match.password)) {
                res.status(200).json({ authentication: true, author: username })
            }
            else {
                res.status(200).json({ authentication: false })
            }
        }
        catch {
            res.status(500).send();
        }
    }
    else {
        res.status(200).json({ authentication: false })
    }
})

module.exports = authenticationHandler;
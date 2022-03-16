const express = require('express');
const bcrypt = require('bcrypt')
const authenticationModel = require('../models/authenticationModel')
const addUserHandler = express.Router();

addUserHandler.post('/', async (req, res) => {
    const data = req.body;
    const validate = await authenticationModel.exists({ username: data.username })
    if (validate) {
        res.status(200).json({ message: 'User Already Exists', auth: false })
    } else {
        try {
            const salt = await bcrypt.genSalt();
            const hashedpass = await bcrypt.hash(req.body.password, salt);
            const newUser = new authenticationModel({ username: data.username, password: hashedpass })
            await newUser.save()
            res.status(200).json({ message: 'User Added successfully', auth: true })
        }
        catch {
            res.status(500).send()
        }
    }
})

module.exports = addUserHandler;
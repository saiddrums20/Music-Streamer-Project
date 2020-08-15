const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
    const validationResult = validate(req.body);
    if(validationResult.error) return res.status(400).send(validationResult.error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);

});

function validate(req) {
    const schema = {//for the password the npm package joi-password-complexity can be installed
        email: Joi.string().min(1).max(50).required().email(),
        password: Joi.string().min(1).max(255).required() //it is 255 here because this is the plain psswd the user inputs and then is hashed to the db
    };

    return Joi.validate(req, schema);
};

module.exports = router;
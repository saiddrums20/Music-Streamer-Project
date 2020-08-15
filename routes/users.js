const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -isAdmin -__v');
    res.send(user);
});

router.post('/', async (req,res) => {
    const validationResult = validate(req.body);
    if(validationResult.error) return res.status(400).send(validationResult.error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });
    //another way of implementing the above user is: user = new User(_.pick(user, ['name','email','password']));

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['id','name', 'email'])); //the _.pick() selects specific properties from and object
});

module.exports = router;
const auth = require('../middleware/auth');
const {Stream, validate} = require('../models/stream');
const{Track} = require('../models/track');
const{Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const stream = await Stream.find().sort('-dateStreamed');
    res.send(stream)
});

router.get('/:id',async (req,res) => {
    const stream = await Stream.findById(req.params.id);

    if(!stream) return res.status(404).send('The stream with the given ID was not found');

    res.send(stream);
});

router.post('/', auth, async (req,res) => {
    const validationResult = validate(req.body);
    if(validationResult.error) return res.status(400).send(validationResult.error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.');

    const track = await Track.findById(req.body.trackId);
    if(!track) return res.status(400).send('Invalid track.');

    const stream = new Stream({
        customer: {
            _id: customer._id,
            name: customer.name,
            email: customer.email
        },
        track: {
            _id: track._id,
            title: track.title,
            dailyStreamRate: track.dailyStreamRate
        }
    });
    await stream.save();
    res.send(stream);
});

module.exports = router; 
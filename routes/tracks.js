const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Track, validate} = require('../models/track');
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const track = await Track.find().sort('title');
    res.send(track)
});

router.get('/:id',async (req,res) => {
    const track = await Track.findById(req.params.id);

    if(!track) return res.status(404).send('The track with the given ID was not found');

    res.send(track);
});

router.post('/', auth, async (req,res) => {
    const validationResult = validate(req.body);
    if(validationResult.error) return res.status(400).send(validationResult.error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');

    const track = new Track({
        title: req.body.title,
        genre: { //we cant just put genre: genre here because in the real worl it can have a lot of properties and we want to only include the ones we will use for this Track schema
            _id: genre._id,
            name: genre.name
        },
        dailyStreamRate: req.body.dailyStreamRate
    });

    await track.save();
    res.send(track);
});

router.put('/:id', auth, async (req,res) => {
    //validation
    const validationResult = validate(req.body);
    if(validationResult.error) return res.status(400).send(validationResult.error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');

    let track = new Track({
        title: req.body.title,
        genre: { 
            _id: genre._id,
            name: genre.name
        },
        dailyStreamRate: req.body.dailyStreamRate
    }, { new: true });

    //looks if id is valid
    if(!track) return res.status(404).send('The record with the given ID was not found');
    
    res.send(track);
});

router.delete('/:id', [auth, admin], async (req,res) => {

    const track = await Track.findByIdAndRemove(req.params.id, {
        useFindAndModify: false
    });
    if(!track) return res.status(404).send('The track with the given ID was not found');
    
    res.send(track);
});

module.exports = router;
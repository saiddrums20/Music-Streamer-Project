const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', validateObjectId, async (req,res) => {

    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('The record with the given ID was not found');

    res.send(genre);
});

router.post('/', auth, async (req,res) => {

    const validationResult = validate(req.body);
    if(validationResult.error) return res.status(400).send(validationResult.error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });
    await genre.save();
    res.send(genre);
});

router.put('/:id', auth, validateObjectId, async (req,res) => {
    //validation
    const validationResult = validate(req.body);
    if(validationResult.error) return res.status(400).send(validationResult.error.details[0].message);
    
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true,
        useFindAndModify: false
    });

    //looks if id is valid
    if(!genre) return res.status(404).send('The record with the given ID was not found');
    
    res.send(genre);
});

router.delete('/:id', [auth, admin], validateObjectId, async (req,res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id, {
        useFindAndModify: false
    });
    if(!genre) return res.status(404).send('The record with the given ID was not found');
    
    res.send(genre);
});

module.exports = router;
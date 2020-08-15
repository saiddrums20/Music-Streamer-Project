const mongoose = require('mongoose');
const Joi = require('joi'); //returns a class
const {genreSchema} = require('./genre');

const Track = mongoose.model('Track', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    dailyStreamRate: {
        type: Number,
        min: 0,
        max: 10000,
        required: true
    }

}));

function validateTrack(track) {
    const schema = {
        title: Joi.string().min(1).max(50).required(),
        genreId: Joi.objectId().required(),
        dailyStreamRate: Joi.number().min(0).required()
    };

    return Joi.validate(track, schema);
};

module.exports.Track = Track;
module.exports.validate = validateTrack;
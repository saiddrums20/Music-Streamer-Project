const {Stream} = require('../models/stream');
const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const Joi = require('joi');
const router = express.Router();

router.post('/', [auth, validate(validateStream)], async (req, res) => {
    const stream = await Stream.lookup(req.body.customerId,req.body.trackId);
    if(!stream) return res.status(404).send('Stream not found');

    return res.send(stream);
});

function validateStream(req) {
    const schema = {
        customerId: Joi.objectId().required(),
        trackId: Joi.objectId().required()
    };

    return Joi.validate(req, schema);
};

module.exports = router;
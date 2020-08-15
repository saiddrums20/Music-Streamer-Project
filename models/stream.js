const Joi = require('joi');
const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },
            paidMember: {
                type: Boolean,
                default: false
            },
            email: {
                type: String,
                required: true,
                minlength: 9,
                maxlength: 50
            }
        }),
        required: true
    },
    track: {
        type: new mongoose.Schema ({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 1,
                maxlength: 50
            },
            dailyStreamRate: {
                type: Number,
                min: 0,
                max: 10000,
                required: true
            }
        }),
        required: true
    },
    dateStreamed: {
        type: Date,
        required: true,
        default: Date.now
    },
    streamFee: {
        type: Number,
        min: 0
    }
});

streamSchema.statics.lookup = function(customerId, trackId) {
    return this.findOne({
        'customer._id': customerId,
        'track._id': trackId
    });
}

const Stream = mongoose.model('Stream', streamSchema);

function validateStream(stream) {
    const schema = {
        customerId: Joi.objectId().required(),
        trackId: Joi.objectId().required()
    };
    return Joi.validate(stream, schema);
};

module.exports.Stream = Stream;
module.exports.validate = validateStream;
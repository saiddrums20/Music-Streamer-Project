const mongoose = require('mongoose');
const Joi = require('joi'); //returns a class

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 50
    },
    paidMember: {
        type: Boolean,
        default: false
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(9).max(50).required(),
        paidMember: Joi.bool().required()
    };

    return Joi.validate(customer, schema);
};

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
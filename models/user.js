const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi'); //returns a class

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        min: 1,
        max: 1024,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {//for the password the npm package joi-password-complexity can be installed
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(1).max(50).required().email(),
        password: Joi.string().min(1).max(255).required(), //it is 255 here because this is the plain psswd the user inputs and then is hashed to the db
        isAdmin: Joi.boolean()
    };

    return Joi.validate(user, schema);
};

module.exports.User = User;
module.exports.validate = validateUser;
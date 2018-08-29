const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {


    //abc123# ====> the same could have done with the help of process(env) variable as well
    //but as of now i am doing hard code here.

    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString()
    }, 'abc123#').toString();
    user.tokens.push({
        access,
        token
    });

    return user.save().then(() => {
        return token;
    });

}

UserSchema.statics.findByToken = function (token) {

    var User = this;
    var decoded;
    try {

        //abc123# ====> the same could have done with the help of process(env) variable as well
        //but as of now i am doing hard code here.
        decoded = jwt.verify(token, 'abc123#');
    } catch (e) {

        return Promise.reject();
    }

    var userData = User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
    return userData;
}

UserSchema.pre('save', function (next) {

    var user = this;

    if (user.isModified('password')) {

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });

        });

    } else {
        next();
    }

});

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({
        email
    }).then((user) => {

        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    reject();
                } else {
                    resolve(user);
                }
            });
        });
    }).catch((e) => {
        return Promise.reject();
    });
}

var User = mongoose.model('user', UserSchema);

module.exports = {
    User
};
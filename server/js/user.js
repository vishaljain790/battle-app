import {User} from '../models/users';
const _ = require('lodash');

const createNewUser = (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    let user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
}


const loginUser = (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {

            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
}
module.exports = {
    createNewUser,
    loginUser
}
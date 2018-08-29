import {
    Battle
} from '../models/schema';

const getStat = (req, res) => {
    Battle.findMostActiveAttackerKing().then((result) => {
        res.send(result);

    }).catch((err) => {
        res.status(400).send(err);
    });
}

module.exports = {
    getStat
}
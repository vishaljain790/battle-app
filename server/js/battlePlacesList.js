import {
    Battle
} from '../models/schema';

const getPlaceList = (req, res) => {

    //$where ===> to check length of location
    // distinct ====? to get distinct values only
    Battle.find({
        $where: 'this.location.length>0'
    }).distinct('location').then((places) => {
        res.send(places);
    }, (e) => {
        res.status(400).send(e);
    });
}

module.exports = {
    getPlaceList
}
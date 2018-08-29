import {Battle} from '../models/schema';


//****King name is mandatory in case to fetch data  */
//*** It's upto user for location and battle type */

//here, i am using modular approach so rather than writing inside schema, here i am writing in js itself.
//To make available any functionality to other js too, then we can use another approach.
const getSearchResult = (req, res) => {

    let kingName = req.query.king;
    let location = req.query.location;
    let type = req.query.type;

    let tempJson = {
        $or: [{
            attacker_king: kingName
        }, {
            defender_king: kingName
        }],
        location,
        battle_type: type
    }

    //es6 feature to delete a field with value holding undefined condition
    Object.keys(tempJson).forEach(key => tempJson[key] === undefined ? delete tempJson[key] : '');

    Battle.find(tempJson).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });


}

module.exports = {
    getSearchResult
}
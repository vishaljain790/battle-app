import mongoose from 'mongoose';
const _ = require('lodash');


//schema for battle places
const BattlePlaceSchema = new mongoose.Schema({
    name: {type: String},
    location: {type: String},
    year: {type: Number},
    battle_number: {type: Number},
    attacker_king: {type: String},
    defender_king: {type: String},
    attacker_1: {type: String},
    attacker_2: {type: String},
    attacker_3: {type: String},
    attacker_4: {type: String},
    defender_1: {type: String},
    defender_2: {type: String},
    defender_3: {type: String},
    defender_4: {type: String},
    attacker_outcome: {type: String},
    battle_type: {type: String},
    major_death: {type: Number},
    major_capture: {type: Number},
    attacker_size: {type: Number},
    defender_size: {type: Number},
    attacker_commander: {type: String},
    defender_commander: {type: String},
    summer: {type: Number},
    location: {type: String},
    region: {type: String},
    note: {type: String}
});

BattlePlaceSchema.statics.findMostActiveAttackerKing = () => {

    let response = {
        mostActive: {},
        attacker_outcome: {},
        battle_type: [],
        defender_size: {}
    };

    return Battle.aggregate([
        {

            //facet is used to call multiple stage operator for same input....
            $facet : {
                        "AttackerKing" : [{ $group: { _id : "$attacker_king", total: {$sum : 1}}},{ $sort: {total: -1}}, {$project: {attacker_king : 1}}, {$limit: 1}],
                        "DefenderKing" : [{ $group: { _id : "$defender_king", total: {$sum : 1}}},{ $sort: {total: -1}}, {$project: {defender_king : 1}}, {$limit: 1}],
                        "Region" : [{ $group: { _id : "$region", total: {$sum : 1}}},{ $sort: {total: -1}}, {$project: {region : 1}}, {$limit: 1}],
                        "Name" : [{ $group: { _id : "$name", total: {$sum : 1}}},{ $sort: {total: -1}}, {$project: {name : 1}}, {$limit: 1}],
                        "AttackerOutcome" : [{ $group: { _id : "$attacker_outcome", total: {$sum : 1}}},{ $sort: {total: -1}}, {$project: {total : 1}}]
                     }
        }
    ]).then((result) => {

        //lodash is also an option to parse or get the data.....
         response.mostActive["attacker_king"] = result[0].AttackerKing[0]._id;
         response.mostActive["defender_king"] = result[0].DefenderKing[0]._id;
         response.mostActive["region"] = result[0].Region[0]._id;
         response.mostActive["name"] = result[0].Name[0]._id;
         response.attacker_outcome["win"] = result[0].AttackerOutcome[0].total;
         response.attacker_outcome["loss"] = result[0].AttackerOutcome[1].total;

        return Battle.find({$where: 'this.battle_type.length>0'}).distinct('battle_type')
    }).then((result)=>{

        response.battle_type = result;

        return Battle.aggregate([ {$match:{"defender_size":{"$ne":""}}},{
            $group: {
                _id: "",
                average: {$avg: "$defender_size"},
                min: {$min: "$defender_size"},
                max: {$max: "$defender_size"}
            },     
        },{$project: {_id:0 , average : 1, min: 1, max: 1}}]);
    }).then((result) => {
        response.defender_size = result[0];
        return Promise.resolve(response);
    }).catch((err) => {
        return Promise.reject();
    })
}
const Battle = mongoose.model('battle-collection', BattlePlaceSchema);

module.exports = {
    Battle
};
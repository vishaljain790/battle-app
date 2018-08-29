import {
    Battle
} from '../models/schema';

const getBattleCount = (req, res) => {
    Battle.find({
        $or: [{
                $and: [{
                    $where: 'this.defender_1.length > 0'
                }, {
                    $where: 'this.attacker_1.length > 0'
                }]

            },
            {
                $and: [{
                    $where: 'this.defender_2.length > 0'
                }, {
                    $where: 'this.attacker_2.length > 0'
                }]

            },
            {
                $and: [{
                    $where: 'this.defender_3.length > 0'
                }, {
                    $where: 'this.attacker_3.length > 0'
                }]

            },
            {
                $and: [{
                    $where: 'this.defender_4.length > 0'
                }, {
                    $where: 'this.attacker_4.length > 0'
                }]

            },
        ]
    }).then((result) => {
        let totalBattle = result.length;

        res.send({
            totalBattle
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
}

module.exports = {
    getBattleCount
}
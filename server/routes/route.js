import {getPlaceList} from '../js/battlePlacesList';
import {getBattleCount} from '../js/battleCount';
import {getStat} from '../js/stats';
import {getSearchResult} from '../js/search';
import {createNewUser,loginUser} from '../js/user';

//authenticate middleware to check auth token
//Note: auth-token always must be passed in header only.
import {authenticate} from '../middleware/authenticate';

module.exports = (app) => {

    //Assumption: let's consider all the unique location to fetch for this endpoint.
    app.get('/list', authenticate, (req, res) => {
        getPlaceList(req, res);
    });
    //Assumption: considering only those battles in which both attacker and defender presents
    // if only attackers are present then it will not bt count
    // and same for defenders as well, if only defenders are present then will not count as well.
    app.get('/count', authenticate, (req, res) => {
        getBattleCount(req, res);
    });
    app.get('/stats', authenticate, (req, res) => {
        getStat(req, res);
    });
    app.get('/search', authenticate, (req, res) => {
        getSearchResult(req, res);
    });



    //user additional end points
    //utilities to generate auth token
    app.post('/user', (req, res) => {
        createNewUser(req, res);
    });

    app.post('/user/login', (req, res) => {
        loginUser(req, res);
    });
}
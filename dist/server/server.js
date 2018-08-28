'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//create app server and setup middleware
//required module 
var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

//port decalartion.
var port = process.env.PORT || 3000;

//listening on port
app.listen(port, function () {
    console.log('server connected on port: ' + port);
});
var express = require('express');
var app = express();
var router = express.Router();
var logger = require('log4js').getLogger('Bot Controller');
var fbBot = require("../../../bot/fb");
var jwt = require('jsonwebtoken');
var config = require("../../../../config");

router.post('/api/auth', function(req, res) {
    var token = jwt.sign({ foo: 'bar' }, config.getSecret());
    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });
});

module.exports = router;

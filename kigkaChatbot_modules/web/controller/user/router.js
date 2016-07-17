var express = require('express');
var app = express();
var router = express.Router();
var logger = require('log4js').getLogger('User Controller');
var userServices = require("../../../common/services/userServices");
var jwt = require('jsonwebtoken');
var config = require("../../../../config");

router.post('/api/user/singup', function(req, res) {
    logger.info(req.url);
    var newUser = { username: "quyquy", password: "vutranquy2512", email: "tranquy2512" };
    userServices.createUser(newUser, function(err) {
        if (err) {
            logger.error(err);
            res.json({
                success: false,
                data: err,
            });
        } else {
            res.json({
                success: true,
                data: newUser,
            });
        }
    });
});

router.post('/api/user/auth', function(req, res) {
	logger.info(req.url);
    var userData = req.body;
    userServices.authenticate(userData, function(err, user) {
        if (err) {
            res.json({
                success: false,
                data: err,
            });
        } else {
            if (user.length > 0) {
                var token = jwt.sign({ _id: user._id }, config.getSecret());
                res.json({
                    success: true,
                    data: token,
                });
            } else {
                res.json({
                    success: false,
                    data: "Authentication Err",
                });
            }

        }
    });

});

module.exports = router;

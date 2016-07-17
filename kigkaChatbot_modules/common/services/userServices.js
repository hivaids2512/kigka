"use strict";
var user = require("../schema/user");
var logger = require('log4js').getLogger('User Services');
var md5 = require('MD5');

class plightServices{

	constructor(){

	}

	createUser(userData, callback) {
        var newUser = user(userData);
        newUser.save(function(err) {
            if (err) {
                logger.error(err);
            } else {
                logger.info("New user created");
            }
            callback(err);
        });
    }

    findUserById(userId, callback) {
        user.find({ _id : userId }, function(err, user) {
            if (err) {
                logger.error(err);
            } 
            callback(err, user);
        });
    }

    authenticate(userData, callback){
        user.find({ username : userData.username, password : md5(userData.password) }, function(err, user) {
            if (err) {
                logger.error(err);
            } 
            callback(err, user);
        });
    }

    findAllUser(callback) {
        user.find({}, function(err, users) {
            if (err) {
                logger.error(err);
            } 
            callback(err, users)
        });
    }

}

module.exports = new plightServices();
"use strict";
var plight = require("../schema/plight");
var logger = require('log4js').getLogger('Plight Services');
var mongoose = require('mongoose');
class plightServices{

	constructor(){

	}

	createPlight(plightData, callback) {
        var newPlight = plight(plightData);
        newPlight.save(function(err) {
            if (err) {
                logger.error(err);
            } else {
                logger.info("New plight created");
            }
            callback(err);
        });
    }

    findPlightById(plightId, callback) {
        plight.find({ _id : plightId }, function(err, plight) {
            if (err) {
                logger.error(err);
            } 
            callback(err, plight);
        });
    }

    findByBotId(botId, callback) {
        plight.find({ bot : botId }, function(err, plights) {
            if (err) {
                logger.error(err);
            } 
            callback(err, plights);
        });
    }

    findAllPlights(callback) {
        plight.find({}, function(err, plights) {
            if (err) {
                logger.error(err);
            } 
            callback(err, plights);
        });
    }

}

module.exports = new plightServices();
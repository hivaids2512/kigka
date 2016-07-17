"use strict";
var botServices = require("../../common/services/botServices");
var plightServices = require("../../common/services/plightServices");
var fbServices = require("./services/fbServices");
var logger = require('log4js').getLogger('fbBot');
var async = require('async');
class fbBot {

    constructor() {

    }

    filter(input, plights) {
        for (var plight of plights) {
            if (
                plight.keywords.indexOf(input) !== -1) {
                return plight;
            }
        }
        return null;
    }

    /*
    loadCases(botid, callback) {
        plightServices.findByBotId({ "botid": botid }, function(err, plights) {
            callback(err, plights);
        });
    }

    getAccessToken(botid, callback) {
        botServices.findBotById(botid, function(err, bot) {
            callback(err, bot);
        });
    }
    */

    reply(botid, senderid, input, res) {
        var that = this;
        async.waterfall([

            function(callback) {

                botServices.findBotById(botid, function(err, bot) {
                    if (err) {
                        logger.error(err);
                        return err;
                    } else {
			logger.info(botid);
			logger.info(bot[0]);
                        callback(null, bot[0].accesstoken);
                    }
                });
            },

            function(accesstoken, callback) {
                plightServices.findByBotId(botid, function(err, plights) {
                    if (err) {
                        logger.error(err);
                        return err;
                    } else {
			logger.info(accesstoken);
                        callback(null, accesstoken, plights);
                    }
                });
            },

            function(accesstoken, plights, callback) {
                var plight = that.filter(input, plights);
                //var sender = await (fbService.getSenderName(senderid, accesstoken));
                if (plight) {
                    switch (plight.outputType) {
                        case 'text':
                            fbServices.sendTextMessage(senderid, plight.output, accesstoken);
                            res.send('ok');
                        case 'button':
                            //text = "Today is Sunday";
                            break;

                        case 'generic':

                        case 'attachment':

                        default:
                            text = "Looking forward to the Weekend";
                    }
                } else {
                    res.send('Sorry! I did not understand you!');
                }

                callback(null);

            }
        ], function(err, result) {
            if (err) {
                logger.error(err);
            } else {

            }


        });


    }

}

module.exports = new fbBot();

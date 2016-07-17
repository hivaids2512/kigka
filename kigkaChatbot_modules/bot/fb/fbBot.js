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

    reply(botid, senderid, input, res) {
        var that = this;
        async.waterfall([

            function(callback) {

                botServices.findBotById(botid, function(err, bot) {
                    if (err) {
                        logger.error(err);
                        return err;
                    } else {
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
                            fbServices.sendTextMessage(senderid, plight.output[0], accesstoken);
                            res.send('sd');
                            break;
                        case 'button':
                            fbServices.sendButtonMessage(senderid, plight.output[0], accesstoken);
                            res.send('sd');
                            break;
                        case 'generic':
                            fbServices.sendGenericMessage(senderid, plight.output[0], accesstoken);
                            res.send('sd');
                            break;
                        case 'image':
                            fbServices.sendAttachment(senderid, plight.output[0], accesstoken);
                            res.send('sd');
                            break;
                        case 'video':
                            fbServices.sendAttachment(senderid, plight.output[0], accesstoken);
                            res.send('sd');
                            break;
                        case 'file':
                            fbServices.sendAttachment(senderid, plight.output[0], accesstoken);
                            res.send('sd');
                            break;
                        default:
                            fbServices.sendTextMessage(senderid, 'Sorry! I did not understand you!', accesstoken);
                            res.send('o');
                            break;
                    }
                } else {
                    fbServices.sendTextMessage(senderid, 'Sorry! I did not understand you!', accesstoken);
		            res.send('o');
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

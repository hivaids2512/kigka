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

    reply(botid, senderid, input) {
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
                            break;
                        case 'button':
                            fbServices.sendButtonMessage(senderid, plight.output[0].text, plight.output[0].buttons , accesstoken);
                            break;
                        case 'generic':
                            fbServices.sendGenericMessage(senderid, plight.output[0], accesstoken);
                            break;
                        case 'image':
                            fbServices.sendAttachment(senderid, plight.output[0], accesstoken);
                            break;
                        case 'video':
                            fbServices.sendAttachment(senderid, plight.output[0], accesstoken);
                            break;
                        case 'file':
                            fbServices.sendAttachment(senderid, plight.output[0], accesstoken);
                            break;
                        default:
                            fbServices.sendTextMessage(senderid, 'Sorry! I did not understand you!', accesstoken);
                            break;
                    }
                } else {
                    fbServices.sendTextMessage(senderid, 'Sorry! I did not understand you!', accesstoken);
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

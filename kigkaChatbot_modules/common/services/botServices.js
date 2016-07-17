"use strict";
var bot = require("../schema/bot");
var logger = require('log4js').getLogger('Bot Services');
class botServices{

	constructor(){

	}

	createBot(botData, callback) {
        var newBot = bot(botData);
        newBot.save(function(err) {
            if (err) {
                logger.error(err);
            } else {
                logger.info("New bot created");
            }
            callback(err);
        });
    }

    findBotById(botId, callback) {
        bot.find({ _id : botId }, function(err, bot) {
            if (err) {
                logger.error(err);
            } 
            callback(err, bot)
        });
    }

    findAllBot(callback) {
        bot.find({}, function(err, bots) {
            if (err) {
                logger.error(err);
            } 
            callback(err, bots)
        });
    }
}

module.exports = new botServices();
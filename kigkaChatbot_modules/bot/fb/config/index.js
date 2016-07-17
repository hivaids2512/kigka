'use strict';

// Logger
var logger = require('log4js').getLogger('fbBot Config');
logger.info("Loading fbBot confiuration...");

var config = require("./configuration");

if (!config) {
    logger.fatal("Fail to load configuration!");
    process.exit();
}

function getFbGraphUrl(){
    return config.FACEBOOK_GRAPH;
}

function getFbGraphMessUrl(){
    return config.FACEBOOK_GRAPH_MESSAGE;
}

module.exports = {
    getFbGraphUrl : getFbGraphUrl,
    getFbGraphMessUrl : getFbGraphMessUrl,
};
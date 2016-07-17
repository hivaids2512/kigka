'use strict';

// Logger
var logger = require('log4js').getLogger('Config');
logger.info("Loading confiuration...");

var config = require("./configuration");

if (!config) {
    logger.fatal("Fail to load configuration!");
    process.exit();
}

function getServerPort() {
    return config.SERVER_PORT;
}

function getServerIp() {
    return config.SERVER_IP;
}

function getVerifyToken() {
    return config.HUB_VERIFY_TOKEN;
}

function getDbServer() {
    return config.DB_SERVER;
}

function getDbName() {
    return config.DB_NAME;
}

function getDbProtocol(){
    return config.DB_PROTOCOL;
}

function getDbUser(){
    return config.DB_USER;
}

function getDbPass(){
    return config.DB_PASS;
}

function getDbPort(){
    return config.DB_PORT;
}

function getSecret(){
    return config.SECRET;
}

function getConnectionString(){
    return getDbProtocol() + "://" + getDbUser() + ":" + getDbPass() + "@" + getDbServer() + ":" + getDbPort() + "/" + getDbName();
}

module.exports = {
    getServerPort: getServerPort,
    getServerIp: getServerIp,
    getVerifyToken: getVerifyToken,
    getDbServer: getDbServer,
    getDbName: getDbName,
    getConnectionString: getConnectionString,
    getSecret : getSecret,
};
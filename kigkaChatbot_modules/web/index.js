var express = require('express');
var app = express();
var router = express.Router();
var rek = require('rekuire');
var logger = require('log4js').getLogger('Webhook');
//var crud = require("../db/crud");
var config = rek('config');
//var database = require("../db/database");

function initRoutes(app){
    var routers = [];
    var homeRoute = require("./controller/home/router");
    var webhookRoute = require("./controller/webhook/router");
    var botRoute = require("./controller/bot/router");
    var plightRoute = require("./controller/plight/router");
    var authRoute = require("./controller/auth/router");
    var userRoute = require("./controller/user/router");

    routers.push(homeRoute);
    routers.push(webhookRoute);
    routers.push(botRoute);
    routers.push(plightRoute);
    routers.push(authRoute);
    routers.push(userRoute);

    app.use(routers);

}

module.exports = {
    initRoutes : initRoutes,
};


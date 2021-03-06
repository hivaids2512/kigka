
'use strict';

    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var http = require('http');
    var logger = require('log4js').getLogger('Server');
    var rek = require('rekuire');
    var cls = require('continuation-local-storage');
    var mongoose = require("mongoose");
    var jwt = require('jsonwebtoken');

    // Create Namespace (CLS)
    cls.createNamespace('kigkachatbot');
    var async = require('async');

    app.disable('x-powered-by');

    var config;

    // Use Body Parser
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

    async.waterfall([
        function(callback) {
            config = require("./config");
            callback(null);
        },
        function(callback) {
            logger.info("Checking database connection...");
            mongoose.connect(config.getConnectionString(), function(err) {
                if (err) {
                    logger.error(err);
                    process.exit(1);
                } else {
                    logger.info("Database connection OK!")
                }
            });
            callback(null);
        },
        function(callback) {
            var web = require('./kigkaChatbot_modules/web');
            web.initRoutes(app);
            callback(null);
        }

    ], function(err) {
        if (err) {
            logger.error(err);
            process.exit(1);
        } else {
            // Start Server

            app.set('port', process.env.PORT || 5000);
            app.set('ip', process.env.IP || "0.0.0.0");

            var port = app.get('port');
            var server = app.get('ip');

            http.createServer(app).listen(port, server, function() {
                logger.info('Server is running on ' + server + ':' + port);
            });
        }
    });

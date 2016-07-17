var express = require('express');
var app = express();
var router = express.Router();
var logger = require('log4js').getLogger('Bot Controller');
var fbBot = require("../../../bot/fb");
var botServices = require("../../../common/services/botServices");
var authMiddleware = require("../../middleware/auth");

// respond with "hello world" when a GET request is made to the homepage
router.get('/api/bot/:botid', authMiddleware, function(req, res) {
    logger.info(req.url);
    var botId = req.params.botid;
    botServices.findBotById(botId, function(err, bot) {
        if (err) {
            logger.error(err);
            res.json({
                success: false,
                data: err,
            });
        } else {
            res.json({
                success: true,
                data: bot,
            });
        }
    });
});

router.post('/api/bot/newbot/', authMiddleware, function(req, res) {
    logger.info(req.url);
    var newbot = req.body.data;
    botServices.createBot(newbot, function(err) {
        if (err) {
            logger.error(err);
            res.json({
                success: false,
                data: err,
            });
        } else {
            res.json({
                success: true,
                data: newbot,
            });
        }
    });
});

module.exports = router;

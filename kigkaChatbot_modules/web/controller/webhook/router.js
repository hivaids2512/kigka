var express = require('express');
var app = express();
var router = express.Router();
var logger = require('log4js').getLogger('Webhook Controller');
var fbBot = require("../../../bot/fb/fbBot");

// respond with "hello world" when a GET request is made to the homepage
router.get('/api/webhook/:botid', function(req, res) {
    if (req.query['hub.verify_token'] === 'kigka') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

router.post('/api/webhook/:botid', function(req, res) {
    var botid = req.params.botid;
	logger.info("quy");
    var entries = req.body.entry;
    if (entries) {
        for (var entry of entries) {
            var messaging = entry.messaging;
            logger.info("quy2");
            for (var message of messaging) {
                var senderId = message.sender.id;
                var pageId = message.recipient.id;
                if (message.message) {
                    // If user send text
                    if (message.message.text) {
                        fbBot.reply(botid, senderId, message.message.text);
                    }
                    // If user send attachment
                    else if (message.message.attachments) {
                        //fbbot.sendAttachmentBack(senderId, message.message.attachments[0], accesstoken);
                    }
			res.send("sda");
                }
                // If user click button
                else if (message.postback) {
                    // var payload = message.postback.payload;
                    //fbbot.processPostback(senderId, payload, accesstoken);
                } else {
			res.send("kidding me?");
                }
                res.send("kidding me?");
            }
        }
    } else {
        res.send("kidding me?");
    }

});

module.exports = router;

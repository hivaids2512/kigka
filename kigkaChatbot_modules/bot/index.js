var express = require('express');
var app = express();
var router = express.Router();
var logger = require('log4js').getLogger('Bot');

// respond with "hello world" when a GET request is made to the homepage
router.get('/kigkaChatbot/bot', function(req, res) {
  logger.info(req.url);	
  res.send('hello world');
});

module.exports = router;
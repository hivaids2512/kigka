var express = require('express');
var app = express();
var router = express.Router();
var logger = require('log4js').getLogger('Home Controller');
var fbBot = require("../../../bot/fb/fbBot");

// respond with "hello world" when a GET request is made to the homepage
router.get('/', function(req, res) {
  logger.info(req.url);	
  res.send("asd");
});

module.exports = router;
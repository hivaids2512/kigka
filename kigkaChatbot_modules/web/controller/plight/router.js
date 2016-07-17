var express = require('express');
var app = express();
var router = express.Router();
var logger = require('log4js').getLogger('Bot Controller');
var fbBot = require("../../../bot/fb");
var plightServices = require("../../../common/services/plightServices");
var authMiddleware = require("../../middleware/auth"); 

// respond with "hello world" when a GET request is made to the homepage
router.get('/api/plight/:plightid', authMiddleware, function(req, res) {
	var plightid = req.params.plightid;
    plightServices.findPlightById(plightid, function(err, plight){
        if (err) {
            logger.error(err);
            res.json({
                success: false,
                data: err,
            });
        } else {
            res.json({
                success: true,
                data: plight,
            });
        }
    });
});

router.post('/api/plight/newplight/', authMiddleware, function(req, res) {
    var newplight = req.body.data;
    plightServices.createPlight(newplight, function(err){
        if (err) {
            logger.error(err);
            res.json({
                success: false,
                data: err,
            });
        } else {
            res.json({
                success: true,
                data: newplight,
            });
        }
    });
});

module.exports = router;

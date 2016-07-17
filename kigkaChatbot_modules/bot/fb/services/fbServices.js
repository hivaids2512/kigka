"use strict";
var request = require("request");
var logger = require('log4js').getLogger('fbBot services');


class fbServices {
    constructor() {
        this.config = require("../config");
    }

    getSenderName(senderId, accesstoken) {
        var that = this;
        return new Promise((resolve, reject) => {
            if (that._storedUsers[senderId]) {
                resolve(that._storedUsers[senderId]);
            } else {

                request({
                    url: that.config.getFbGraphUrl(),
                    qs: {
                        access_token: accesstoken,
                    },
                    method: 'GET',

                }, function(error, response, body) {
                    var person = JSON.parse(body);
                    that._storedUsers[senderId] = person;
                    resolve(person);
                });
            }
        });
    }

    sendMessage(senderId, messageData, accesstoken) {
        request({
            url: this.config.getFbGraphMessUrl(),
            qs: {
                access_token: accesstoken,
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                logger.error('Error sending message: ', error);
            } else if (response.body.error) {
                logger.info(body);
            }
        });
    }

    sendTextMessage(senderId, text, accesstoken) {
        var messageData = {
            text: text
        };
        request({
            url: this.config.getFbGraphMessUrl(),
            qs: {
                access_token: accesstoken,
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                logger.error('Error sending message: ', error);
            } else if (response.body.error) {
                logger.info(body);
            }
        });
    }

    sendButtonMessage(senderId, text, buttons, accesstoken) {
        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": text,
                    "buttons": buttons
                }
            }
        };

        request({
            url: thisconfig.getFbGraphMessUrl(),
            qs: {
                access_token: accesstoken,
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                logger.error('Error sending message: ', error);
            } else if (response.body.error) {
                logger.info(body);
            }
        });
    }

    sendImage(senderId, imageUrl, accesstoken) {
        var messageData = {
            attachment: {
                type: "image",
                payload: {
                    url: imageUrl
                }
            }
        };
        request({
            url: this.config.getFbGraphMessUrl(),
            qs: {
                access_token: accesstoken,
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                logger.error('Error sending message: ', error);
            } else if (response.body.error) {
                logger.info(body);
            }
        });
    }

    sendAttachment(senderId, attachment, accesstoken) {
        var messageData = {
            attachment: attachment
        };
        request({
            url: this.config.getFbGraphMessUrl(),
            qs: {
                access_token: accesstoken,
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }

    sendGenericMessage(senderId, elements, accesstoken) {

        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": elements
                }
            }
        };

        request({
            url: this.config.getFbGraphMessUrl(),
            qs: {
                access_token: accesstoken,
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }

    sendReceiptMessage(senderId, posts, accesstoken) {

        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "receipt",
                    "elements": []
                }
            }
        };

        var messageElements = posts.map(post => {
            return {
                title: post.title,
                subtitle: post.subtitle,
                quantity: post.quantity,
                price : post.price,
                currency : post.currency,
                image_url: post.featured_image,
            }
        });

        messageData.attachment.payload.elements = messageElements;
        request({
            url: this.config.getFbGraphMessUrl(),
            qs: {
                access_token: accesstoken,
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }


}

module.exports = new fbServices();

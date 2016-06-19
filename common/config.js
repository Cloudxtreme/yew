'use strict';

const confidence = require('confidence');

let store = new confidence.Store({
    amqp: {
        url: `amqp://yew:yew@${process.env.SERVICE_HOST}:${process.env.rabbitmq_PORT}/yew`
    }
});

exports.get = function(key) {
    return store.get(key);
};

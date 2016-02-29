'use strict';

const confidence = require('confidence');

let store = new confidence.Store({
    amqp: {
        url: 'amqp://yew:yew@localhost:5672/yew'
    }
});

exports.get = function(key) {
    return store.get(key);
};

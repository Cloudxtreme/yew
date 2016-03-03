'use strict';

module.exports = function(msg, headers, deliveryInfo, ack) {
    console.log(`Got input: ${msg.data.toString()}`);
    ack.acknowledge();
};

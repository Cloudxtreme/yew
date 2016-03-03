'use strict';

const common = require('../common');
const broker = common.broker;
const config = require('./config').get('/amqp');
const inputHandler = require('./input-handler');

broker.configure()
    .then(() => broker.connection().queue('world.clientInput.coordinator'))
    .then(queue => {
        return queue.subscribe({
            ack: true,
            prefetchCount: 3
        }, inputHandler);
    })
    .catch(err => {
        console.error(err.stack ? err.stack : err);
        process.exit(-1);
    });

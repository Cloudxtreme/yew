'use strict';

const common = require('../common');
const broker = common.broker;
const config = require('./config').get('/amqp');

broker.configure()
    .then(() => broker.connection().queue('world.clientInput.coordinator'))
    .then(queue => {
        return queue.subscribe({
            ack: true,
            prefetchCount: 3
        }, msg => {
            console.log(`Got message: ${JSON.stringify(msg, undefined, 2)}`)
        });
    })
    .catch(err => {
        console.error(err.stack ? err.stack : err);
        process.exit(-1);
    });

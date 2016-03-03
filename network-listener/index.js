'use strict';

const common = require('../common');
const broker = common.broker;
const telnet = require('telnet');
const config = require('./config').get('/amqp');
const server = require('./server');

broker.configure()
    .then(() => broker.connection().exchange('world.clientInput'))
    .then(exchange => server(exchange))
    .catch(err => {
        console.error(err.stack ? err.stack : err);
        process.exit(-1);
    });

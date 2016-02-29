'use strict';

const common = require('../common');
const broker = common.broker;
const telnet = require('telnet');
const config = require('./config').get('/amqp');

broker.configure()
    .then(() => broker.connection().exchange('world.clientInput'))
    .then(exchange => {
        telnet.createServer(client => {
            client.do.transmit_binary();

            client.on('data', data => {
                exchange.publish(' ', data.toString('utf8'))
                    .then(() => {
                        console.log('Input published');
                    });
            });
        }).listen(process.env.SERVICE_PORT);
    })
    .catch(err => {
        console.error(err.stack ? err.stack : err);
        process.exit(-1);
    });

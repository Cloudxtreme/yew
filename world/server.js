'use strict';

const winston = require('winston');
const telnet = require('telnet');
const _ = require('lodash');

let serverContext = {
    connections: []
};

function createServer(seneca, exchange) {
    const port = process.env.LISTENER_PORT || 9999;
    telnet.createServer(client => {
        client.do.transmit_binary();

        serverContext.connections.push(client);
        exchange.publish(' ', {});

        client.on('data', data => {

        });
        client.on('error', () => {
            serverContext.connections = _.without(serverContext.connections, client);
        });
    }).listen(port);

    winston.info(`Listening on port ${port}...`);
}

module.exports = createServer;

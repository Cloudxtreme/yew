'use strict';

const winston = require('winston');
const telnet = require('telnet');
const common = require('../common');
const broker = common.broker;
const _ = require('lodash');
const uuid = require('uuid');

class ClientContext {
    constructor(client) {
        this.id = uuid.v4();
        this.client = client;
    }
}

let serverContext = {
    connections: []
};

function createServer(seneca) {
    const port = process.env.LISTENER_PORT || 9999;
    const exchange = broker.exchange('world.newConnection');
    telnet.createServer(client => {
        client.do.transmit_binary();

        client.on('data', data => {
        });
        client.on('error', () => {
            serverContext.connections =
                _.reject(serverContext.connections, ctx => ctx.client === client);
        });

        let ctx = new ClientContext(client);
        serverContext.connections.push(ctx);
        exchange.publish(' ', {
            id: ctx.id
        });
    }).listen(port);

    winston.info(`Listening on port ${port}...`);
}

module.exports = createServer;

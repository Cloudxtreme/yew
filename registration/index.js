'use strict';

const seneca = require('seneca')();
const Promise = require('bluebird');
const common = require('../common');
const broker = common.broker;
const act = Promise.promisify(seneca.act, { context: seneca });

let clients = [];

seneca.add({ role: 'registration', op: 'new-connection' }, (msg, respond) => {
    respond(null, null);
});

seneca.listen({
    host: process.env.SERVICE_HOST,
    port: process.env.SERVICE_PORT
});

class ClientProxy {
    constructor(id) {
        this.id = id;
    }

    send(text) {
        return broker.exchange('world.output').publish(' ', {
            client: this.id,
            text: text
        });
    }

    sendImmediate(text) {
        return act({ role: 'world', op: 'output', client: this.id, text: text });
    }
}

broker.configure([
    'world.newConnection',
    'world.output'
], 'registration.newConnection')
    .then(() => {
        let queue = broker.queue('registration.newConnection');
        queue.subscribe((msg, headers, delivery, ack) => {
            clients.push(msg);
            ack.acknowledge();
        });
    });

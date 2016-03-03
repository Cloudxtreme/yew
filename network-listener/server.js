'use strict';

const telnet = require('telnet');

function createServer(exchange) {
    telnet.createServer(client => {
        client.do.transmit_binary();

        client.on('data', data => {
            exchange.publish(' ', data.toString())
                .then(() => {
                    console.log('Input published');
                });
        });
    }).listen(process.env.SERVICE_PORT);
}

module.exports = createServer;

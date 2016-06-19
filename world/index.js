'use strict';

const seneca = require('seneca')();
const common = require('../common');
const broker = common.broker;
const server = require('./server');
const service = require('./service');

seneca.listen({
    host: process.env.SERVICE_HOST,
    port: process.env.SERVICE_PORT
});

seneca.client({
    host: process.env.PROXY_HOST,
    port: process.env.area_PORT,
    pin: { role: 'area' }
});

seneca.client({
    host: process.env.PROXY_HOST,
    port: process.env.registration_PORT,
    pin: { role: 'registration' }
});

broker.configure('world.newConnection')
    .then(() => {
        service(seneca);
        server(seneca);
    })
    .catch(err => {
        console.error(err);
    });


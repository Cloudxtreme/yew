'use strict';

const seneca = require('seneca')();

seneca.add({ role: 'registration', op: 'new-connection' }, (msg, respond) => {
    respond(null, null);
});

seneca.listen({
    host: process.env.SERVICE_HOST,
    port: process.env.SERVICE_PORT
});

'use strict';

const seneca = require('seneca')();

seneca.add({ role: 'area', op: 'register-character' }, (msg, respond) => {

});

seneca.add({ role: 'area', op: 'unregister-character' }, (msg, respond) => {

});

seneca.listen({
    host: process.env.SERVICE_HOST,
    port: process.env.SERVICE_PORT
});

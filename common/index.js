'use strict';

const broker = require('./broker');

module.exports = {
    broker: {
        configure: broker.configure,
        connection: broker.connection
    }
};

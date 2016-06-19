'use strict';

const winston = require('winston');
const broker = require('./broker');

winston.level = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

module.exports = {
    broker: broker
};

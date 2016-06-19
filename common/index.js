<<<<<<< HEAD
'use strict';

const winston = require('winston');
const broker = require('./broker');

winston.level = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

module.exports = {
    broker: broker
};
=======
'use strict';

const winston = require('winston');
const broker = require('./broker');

winston.level = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

module.exports = {
    broker: {
        configure: broker.configure,
        connection: broker.connection
    }
};
>>>>>>> 1098a58fb4a0816a6fbba98a0821ac806f03b8c9

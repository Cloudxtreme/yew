'use strict';

module.exports = function(seneca) {
    seneca.add({ role: 'world', op: 'output' }, (msg, respond) => {
       respond(null, null);
    });
};

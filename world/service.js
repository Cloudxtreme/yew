'use strict';

module.exports = function(seneca) {
    seneca.add({ role: 'world', op: 'output-immediate' }, (msg, respond) => {
       respond(null, null);
    });
};

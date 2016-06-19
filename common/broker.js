'use strict';

const _ = require('lodash');
const check = require('check-types');
const brokerConfig = require('./broker.json');
const config = require('./config').get('/amqp');
const amqp = require('amqp-as-promised')({
    connection: {
        url: config.url
    }
});

let brokerContext = {
    exchanges: [],
    queues: []
};

function createExchanges(requiredExchanges) {
    if(check.string(requiredExchanges)) {
        requiredExchanges = [ requiredExchanges ];
    }

    requiredExchanges = requiredExchanges || [];
    check.assert.array(requiredExchanges);

    function processExchange(k, exchange) {
        if(_.includes(requiredExchanges, k)) {
            brokerContext.exchanges.push({
                name: k,
                exchange: exchange
            });
        }
    }

    let exchangePromises = [];
    for(let k of Object.keys(brokerConfig.exchanges || {})) {
        let exchangeConfig = _.merge({
            durable: true,
            autoDelete: false
        }, brokerConfig.exchanges[k] || {});

        exchangePromises.push(
            amqp.exchange(k, exchangeConfig).then(processExchange)
        );
    }

    return Promise.all(exchangePromises);
}

function createAndBindQueues(requiredQueues) {
    if(check.string(requiredQueues)) {
        requiredQueues = [ requiredQueues ];
    }

    requiredQueues = requiredQueues || [];
    check.assert.array(requiredQueues);

    let queuePromises = [];
    for(let k of Object.keys(brokerConfig.queues || {})) {
        let queueConfig = _.merge({
            bind: '#'
        }, brokerConfig.queues[k] || {});

        queuePromises.push(
            amqp.queue(k, _.merge({
                    durable: true,
                    autoDelete: false
                }, queueConfig.config || {}))
                .then(queue => queue.bind(queueConfig.bind, ' '))
                .then(queue => {
                    if (_.includes(requiredQueues, k)) {
                        brokerContext.queues.push({
                            name: k,
                            queue: queue
                        });
                    }
                })
        );
    }

    return Promise.all(queuePromises);
}

module.exports = {
    configure: function(requiredExchanges, requiredQueues)  {
        return new Promise((resolve, reject) => {
            createExchanges(requiredExchanges)
                .then(() => createAndBindQueues(requiredQueues))
                .then(resolve)
                .catch(err => reject(err));
        });
    },

    exchange: function(name) {
        return _.find(brokerContext.exchanges, ctx => ctx.name === name);
    },

    queue: function(name) {
        return _.find(brokerContext.queues, ctx => ctx.name === name);
    },

    connection: function() {
        return amqp;
    }
};

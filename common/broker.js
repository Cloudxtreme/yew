'use strict';

const _ = require('lodash');
const brokerConfig = require('./broker.json');
const config = require('./config').get('/amqp');
const amqp = require('amqp-as-promised')({
    connection: {
        url: config.url
    }
});

function createExchanges() {
    let exchangePromises = [];
    for(let k of Object.keys(brokerConfig.exchanges || {})) {
        let exchangeConfig = _.merge({
            durable: true,
            autoDelete: false
        }, brokerConfig.exchanges[k] || {});

        exchangePromises.push(amqp.exchange(k, exchangeConfig));
    }

    return Promise.all(exchangePromises);
}

function createAndBindQueues() {
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
                .then(queue => {
                    return queue.bind(queueConfig.bind, ' ');
                })
        );
    }

    return Promise.all(queuePromises);
}

module.exports = {
    configure: function()  {
        return new Promise((resolve, reject) => {
            createExchanges()
                .then(createAndBindQueues)
                .then(resolve)
                .catch(err => reject(err));
        });
    },

    connection: function() {
        return amqp;
    }
};

'use strict';

// mqtt
var mqtt = require('mqtt')

// Load logger
var logger = require('../logger/logger').logDatabus;

// event for receiving message
const events = require('events');

module.exports = class databusMqtt {
  constructor(topic, options, databusModulName) {
    var that = this;
    logger.debug('Databus config: ' + JSON.stringify(options));
    this._eventEmitter = new events.EventEmitter();
    this._topic = topic;
    options.clientId = 'databusSubscriber' + databusModulName;
    this._client = mqtt.connect(options);

    this._client.on('connect', function() {
      that._client.subscribe(that._topic, function(err) {
        if (err) {
          logger.error(err);
        }
        that.publish('databus', databusModulName + ' connected to databus');
        logger.debug('Ready for topic: ' + JSON.stringify(topic));
      })
    })
    this._client.on('message', function(topic, message) {
      // message is Buffer
      that._eventEmitter.emit('databus', {
        topic: topic,
        message: message
      });
      logger.debug('Databus message: ' + message.toString());
    })
    this._client.on('error', function(error) {
      logger.error(error);
    })
    this._client.on('reconnect', function(error) {
      logger.debug('Databus subscriber client reconnect');
    })
  }

  // Setter and getter
  set topic(topic) {
    this._topic = topic;
  }
  get topic() {
    return this._topic;
  }

  publish(topic, message) {
    this._client.publish(topic, message);
  }

  end() {
    this._client.end();
  }
}
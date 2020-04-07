"use strict";

// mqtt
var mqtt = require("mqtt");

// Load logger
var logger = require("../logger/logger").logDatabus;

// event for receiving message
const EventEmitter = require("events");

module.exports = class databusMqtt extends EventEmitter {
  constructor(topic, options, databusModulName) {
    super();
    var that = this;
    logger.debug("Databus config: " + JSON.stringify(options));

    this._topic = topic;

    options.clientId =
      databusModulName +
      Math.random()
        .toString(16)
        .substr(2, 8);

    this._client = mqtt.connect(options);

    // connect to mqtt server
    this._client.on("connect", function() {
      that._client.subscribe(that._topic, function(err) {
        if (err) {
          logger.error(err);
        }
        that.publish(
          topic,
          JSON.stringify({
            node: "api",
            type: "debug",
            message: "api server connected to mqtt broker"
          })
        );
        logger.debug("Ready for topic: " + JSON.stringify(topic));
      });
    });

    // on receiving mqtt message
    this._client.on("message", function(topic, message) {
      // message is Buffer
      that.emit("databus", {
        topic: topic,
        message: message
      });
      logger.debug("Databus message: " + message.toString());
    });
    this._client.on("error", function(error) {
      logger.error(error);
    });
    this._client.on("reconnect", function(error) {
      logger.debug("Databus subscriber client reconnect");
    });
  }

  // Setter and getter
  set topic(topic) {
    this._topic = topic;
  }
  get topic() {
    return this._topic;
  }

  publish(topic, message) {
    logger.debug("Databus send message: " + message.toString());
    this._client.publish(topic, message);
  }

  end() {
    this._client.end();
  }
};

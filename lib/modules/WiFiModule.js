var wifiCC3000 = require('wifi-cc3000');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

util.inherits(WiFiModule, EventEmitter);

/**
 * Timeout before wifi will try to connect again
 * @type {Number}
 */
var RESET_TIMEOUT = 5 * 1000;

/**
 * Wrapper for wifi-cc3000
 * @constructor
 */
function WiFiModule(config) {
  EventEmitter.call(this);

  this.setConfig(config);
  this.resetTimeouts();

  wifiCC3000.on('timeout', function () {
    this.emit('timeout');
    this._timeouts++;
    return this.getTimeouts() > 2 ? this.reset() : this.connect();
  }.bind(this));

  wifiCC3000.on('connect', this.emit.bind(this, 'connect'));
  wifiCC3000.on('disconnect', this.emit.bind(this, 'disconnect'));
  wifiCC3000.on('error', this.emit.bind(this, 'error'));
}

/**
 * Get configuration
 * @returns {Object}
 */
WiFiModule.prototype.getConfig = function () {
  return this._config;
};

/**
 * Set configuration
 * @param {Object} config
 * @returns {WiFiModule}
 */
WiFiModule.prototype.setConfig = function (config) {
  this._config = config || {};
  return this;
};

/**
 * Get timeouts
 * @returns {Number}
 */
WiFiModule.prototype.getTimeouts = function () {
  return this._timeouts;
};

/**
 * Reset counter for timeouts
 * @returns {WiFiModule}
 */
WiFiModule.prototype.resetTimeouts = function () {
  this._timeouts = 0;
  return this;
};

/**
 * Check if WiFi is connected to network
 * @returns {Boolean}
 */
WiFiModule.prototype.isConnected = function () {
  return wifiCC3000.isConnected();
};

/**
 * Initiate connection process
 * @returns {WiFiModule}
 */
WiFiModule.prototype.connect = function () {
  wifiCC3000.connect(this.getConfig());
  return this;
};

/**
 * Reset WiFi adapter and try to reconnect
 * @returns {WiFiModule}
 */
WiFiModule.prototype.reset = function () {
  wifiCC3000.reset(function () {
    this.resetTimeouts();
    setTimeout(function () {
      if (!this.isConnected()) {
        this.connect();
      }
    }.bind(this), RESET_TIMEOUT);
  }.bind(this));

  return this;
};

module.exports = WiFiModule;

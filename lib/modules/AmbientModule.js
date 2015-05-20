var util = require('util');
var Q = require('q');
var tessel = require('tessel');
var ambientAttx4 = require('ambient-attx4');
var BaseModule = require('./BaseModule');

util.inherits(AmbientModule, BaseModule);

/**
 * Triggers when operation is done
 * @param defer
 * @param error
 * @param data
 * @returns {*}
 * @private
 */
function _onSuccess(defer, error, data) {
  return error ? defer.reject(error) : defer.resolve(data);
}

/**
 * Wrapper for ambient-attx4
 * @param {String} port Which port is using for ambient module
 * @constructor
 */
function AmbientModule(port) {
  BaseModule.call(this);
  this.setNativeModule(ambientAttx4.use(tessel.port[port]));
}

/**
 * Get the last 10 light readings
 * @returns {Promise}
 */
AmbientModule.prototype.getLightBuffer = function () {
  var defer = Q.defer();
  this.getNativeModule().getLightBuffer(_onSuccess.bind(this, defer));
  return defer.promise;
};

/**
 * Get a single data point of light level
 * @returns {Promise}
 */
AmbientModule.prototype.getLightLevel = function () {
  var defer = Q.defer();
  this.getNativeModule().getLightLevel(_onSuccess.bind(this, defer));
  return defer.promise;
};

/**
 * Get the last 10 sound readings
 * @returns {Promise}
 */
AmbientModule.prototype.getSoundBuffer = function () {
  var defer = Q.defer();
  this.getNativeModule().getSoundBuffer(_onSuccess.bind(this, defer));
  return defer.promise;
};

/**
 * Get a single data point of sound level
 * @returns {Promise}
 */
AmbientModule.prototype.getSoundLevel = function () {
  var defer = Q.defer();
  this.getNativeModule().getSoundLevel(_onSuccess.bind(this, defer));
  return defer.promise;
};

/**
 * Triggers callback when light crossing threshold with time interval
 * @param {Number} lightTriggerLevel Light threshold
 * @param {Number} timeInterval Time interval for triggering in ms
 * @param {Function} cb
 */
AmbientModule.prototype.onLightTrigger = function (lightTriggerLevel, timeInterval, cb) {
  var module = this.getNativeModule();

  module.setLightTrigger(lightTriggerLevel);
  module.on('light-trigger', function (data) {
    module.clearLightTrigger();
    setTimeout(module.setLightTrigger.bind(this, lightTriggerLevel), timeInterval);
    cb(data);
  });
};

/**
 * Triggers callback when sound crossing threshold with time interval
 * @param {Number} soundTriggerLevel Sound threshold
 * @param {Number} timeInterval Time interval for triggering in ms
 * @param {Function} cb
 */
AmbientModule.prototype.onSoundTrigger = function (soundTriggerLevel, timeInterval, cb) {
  var module = this.getNativeModule();

  module.setSoundTrigger(soundTriggerLevel);
  module.on('sound-trigger', function (data) {
    module.clearSoundTrigger();
    setTimeout(module.setSoundTrigger.bind(this, soundTriggerLevel), timeInterval);
    cb(data);
  });
};

module.exports = AmbientModule;

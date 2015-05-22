var util = require('util');
var Q = require('q');
var tessel = require('tessel');
var servoPCA9685 = require('servo-pca9685');
var BaseModule = require('./BaseModule');

util.inherits(ServoModule, BaseModule);

/**
 * Triggers when async operation is done
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
 * Wrapper for servo-pca9685
 * @param {String} port
 * @constructor
 */
function ServoModule(port) {
  BaseModule.call(this);
  this.setNativeModule(servoPCA9685.use(tessel.port(port)));
}

/**
 * Set rotating interval
 * @param {Object} interval
 * @returns {ServoModule}
 * @private
 */
ServoModule.prototype._setRotatingInterval = function (interval) {
  this._rotatingInterval = interval;
  return this;
};

/**
 * Get rotating interval
 * @returns {Object}
 * @private
 */
ServoModule.prototype._getRotatingInterval = function () {
  return this._rotatingInterval;
};

/**
 * Clear rotating interval
 * @returns {ServoModule}
 * @private
 */
ServoModule.prototype._clearRotatingInterval = function () {
  clearInterval(this._getRotatingInterval());
  return this;
};

/**
 * Set the PWM max and min for the specified servo
 * @param {Number} servoIndex
 * @param {Number} minPWM Number between 0 and 1
 * @param {Number} maxPWM Number between 0 and 1
 * @returns {Promise}
 */
ServoModule.prototype.configure = function (servoIndex, minPWM, maxPWM) {
  var defer = Q.defer();
  this.getNativeModule().configure(servoIndex, minPWM, maxPWM, _onSuccess.bind(this, defer));
  return defer.promise;
};

/**
 * Move servo to specified position
 * @param {Number} servoIndex Servo index
 * @param {Number} position Position between 0 and 1
 * @returns {Promise}
 */
ServoModule.prototype.move = function (servoIndex, position) {
  var defer = Q.defer();
  this.getNativeModule().move(servoIndex, position, _onSuccess.bind(this, defer));
  return defer.promise;
};

/**
 * Read the current position for the specified servo
 * @param {Number} servoIndex
 * @returns {Promise}
 */
ServoModule.prototype.read = function (servoIndex) {
  var defer = Q.defer();
  this.getNativeModule().read(servoIndex, _onSuccess.bind(this, defer));
  return defer.promise;
};

/**
 * Set duty cycle for the specified servo
 * @param {Number} servoIndex
 * @param {Number} duty Cycle uptime between 0 and 1
 * @returns {Promise}
 */
ServoModule.prototype.setDutyCycle = function (servoIndex, duty) {
  var defer = Q.defer();
  this.getNativeModule().setDutyCycle(servoIndex, duty, _onSuccess.bind(this, defer));
  return defer.promise;
};

/**
 * Set the PWM frequency in Hz
 * @param {Number} hz
 * @returns {Promise}
 */
ServoModule.prototype.setModuleFrequency = function (hz) {
  var defer = Q.defer();
  this.getNativeModule().setModuleFrequency(hz, _onSuccess.bind(this, defer));
  return defer.promise;
};

/**
 * Start rotating the servo
 * @param {Number} _servoIndex
 * @param {Number} [_step] Step for each rotation between 0 and 1
 * @param {Number} [_speed] Speed for interval of next rotation
 * @returns {ServoModule}
 */
ServoModule.prototype.startRotating = function (_servoIndex, _step, _speed) {
  var step = _step || 0.01;
  var speed = _speed || 250;
  var isIncrementing = true;
  var position = 0;
  var cyclesCounter = 0;

  this._clearRotatingInterval();
  this._setRotatingInterval(setInterval(function () {
    this.move(_servoIndex, position);

    cyclesCounter = cyclesCounter < (Math.round((1 / step) - 1)) ? cyclesCounter + 1 : 0;
    isIncrementing = cyclesCounter === 0 ? !isIncrementing : isIncrementing;
    position = isIncrementing ? position + step : position - step;
  }.bind(this), speed));

  return this;
};

/**
 * Stop rotating the servo
 * @returns {ServoModule}
 */
ServoModule.prototype.stopRotating = function () {
  this._clearRotatingInterval();
  return this;
};

module.exports = ServoModule;

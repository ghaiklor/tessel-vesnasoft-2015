var util = require('util');
var Q = require('q');
var tessel = require('tessel');
var servoPCA9685 = require('servo-pca9685');
var BaseModule = require('./BaseModule');

util.inherits(ServoModule, BaseModule);

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
 * Set the PWM max and min for the specified servo
 * @param {Number} servoIndex
 * @param {Number} minPWM Number between 0 and 1
 * @param {Number} maxPWM Number between 0 and 1
 * @returns {Promise}
 */
ServoModule.prototype.configure = function (servoIndex, minPWM, maxPWM) {
  var defer = Q.defer();

  this.getNativeModule().configure(servoIndex, minPWM, maxPWM, function (error) {
    return error ? defer.reject(error) : defer.resolve();
  });

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

  this.getNativeModule().move(servoIndex, position, function (error) {
    return error ? defer.reject(error) : defer.resolve();
  });

  return defer.promise;
};

/**
 * Read the current position for the specified servo
 * @param {Number} servoIndex
 * @returns {Promise}
 */
ServoModule.prototype.read = function (servoIndex) {
  var defer = Q.defer();

  this.getNativeModule().read(servoIndex, function (error, data) {
    return error ? defer.reject(error) : defer.resolve(data);
  });

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

  this.getNativeModule().setDutyCycle(servoIndex, duty, function (error) {
    return error ? defer.reject(error) : defer.resolve();
  });

  return defer.promise;
};

/**
 * Set the PWM frequency in Hz
 * @param {Number} hz
 * @returns {Promise}
 */
ServoModule.prototype.setModuleFrequency = function (hz) {
  var defer = Q.defer();

  this.getNativeModule().setModuleFrequency(hz, function (error) {
    return error ? defer.reject(error) : defer.resolve();
  });

  return defer.promise;
};

/**
 * Turn servo around by 180 degrees
 * @param {Number} servoIndex
 * @returns {Promise}
 */
ServoModule.prototype.turnAround = function (servoIndex) {
  var defer = Q.defer();

  this.read(servoIndex).then(console.log.bind(console.log));

  return defer.promise;
};

module.exports = ServoModule;

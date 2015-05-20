var util = require('util');
var Q = require('q');
var tessel = require('tessel');
var accelMMA84 = require('accel-mma84');
var BaseModule = require('./BaseModule');

util.inherits(AccelerometerModule, BaseModule);

/**
 * Wrapper for accelerometer module
 * @param {String} port
 * @constructor
 */
function AccelerometerModule(port) {
  BaseModule.call(this);
  this.setNativeModule(accelMMA84.use(tessel.port[port]));
}

/**
 * Get the acceleration from the device
 * @returns {Promise}
 */
AccelerometerModule.prototype.getAcceleration = function () {
  var defer = Q.defer();
  this.getNativeModule().getAcceleration(function (error, data) {
    return error ? defer.reject(error) : defer.resolve(data);
  });
  return defer.promise;
};

module.exports = AccelerometerModule;

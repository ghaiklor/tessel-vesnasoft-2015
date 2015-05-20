var util = require('util');
var Q = require('q');
var tessel = require('tessel');
var climateSI7020 = require('climate-si7020');
var BaseModule = require('./BaseModule');

util.inherits(ClimateModule, BaseModule);

/**
 * Wrapper for climate-si7020
 * @param {String} port
 * @constructor
 */
function ClimateModule(port) {
  BaseModule.call(this);
  this.setNativeModule(climateSI7020.use(tessel.port[port]));
}

/**
 * Read temperature in degrees
 * @param {String} [format] "c" or "f"
 * @returns {Promise}
 */
ClimateModule.prototype.readTemperature = function (format) {
  var defer = Q.defer();
  this.getNativeModule().readTemperature(format || 'c', function (error, data) {
    return error ? defer.reject(error) : defer.resolve(data);
  });
  return defer.promise;
};

/**
 * Read relative humidity
 * @returns {Promise}
 */
ClimateModule.prototype.readHumidity = function () {
  var defer = Q.defer();
  this.getNativeModule().readHumidity(function (error, data) {
    return error ? defer.reject(error) : defer.resolve(data);
  });
  return defer.promise;
};

module.exports = ClimateModule;

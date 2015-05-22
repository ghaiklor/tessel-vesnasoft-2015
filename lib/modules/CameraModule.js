var util = require('util');
var Q = require('q');
var tessel = require('tessel');
var cameraVC0706 = require('camera-vc0706');
var BaseModule = require('./BaseModule');

util.inherits(CameraModule, BaseModule);

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
 * Wrapper for camera-vc0706
 * @param {String} port Which port is using for module
 * @param {Object} config Configuration object for camera
 * @returns {CameraModule}
 */
function CameraModule(port, config) {
  BaseModule.call(this);
  this.setNativeModule(cameraVC0706.use(tessel.port[port], config));
}

/**
 * Take picture from camera
 * @returns {Promise}
 */
CameraModule.prototype.takePicture = function () {
  var defer = Q.defer();

  if (!this.isReady()) {
    return defer.reject('Camera is not ready');
  }

  this.getNativeModule().takePicture(_onSuccess.bind(this, defer));

  return defer.promise;
};

module.exports = CameraModule;

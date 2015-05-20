var util = require('util');
var Q = require('q');
var tessel = require('tessel');
var cameraVC0706 = require('camera-vc0706');
var BaseModule = require('./BaseModule');

util.inherits(Camera, BaseModule);

/**
 * Wrapper for camera-vc0706
 * @param {String} port Which port is using for module
 * @param {Object} config Configuration object for camera
 * @returns {Camera}
 */
function Camera(port, config) {
  BaseModule.call(this);
  this.setNativeModule(cameraVC0706.use(tessel.port[port], config));
}

/**
 * Take picture from camera
 * @returns {Promise}
 */
Camera.prototype.takePicture = function () {
  var defer = Q.defer();

  if (!this.isReady()) {
    return defer.reject('Camera is not ready');
  }

  this.getNativeModule().takePicture(function (error, image) {
    return error ? defer.reject(error) : defer.resolve(image);
  });

  return defer.promise;
};

module.exports = Camera;

'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var Q = require('q');
var tessel = require('tessel');
var cameraVC0706 = require('camera-vc0706');

/**
 * Triggers when camera is ready for shots
 * @param {Camera} camera Camera instance
 * @private
 */
function _onCameraReady(camera) {
  camera._setReady(true);
  camera.emit('ready');
}

/**
 * Wrapper for camera-vc0706
 * @param {Object} config Configuration object for camera
 * @returns {Camera}
 */
function Camera(config) {
  EventEmitter.call(this);

  this._setReady(false);
  this._setCamera(cameraVC0706.use(tessel.port[config.port], config));
  this._getCamera().on('ready', _onCameraReady.bind(this, this));
}

util.inherits(Camera, EventEmitter);

/**
 * Get current camera from instance
 * @returns {Object}
 * @private
 */
Camera.prototype._getCamera = function() {
  return this._camera;
};

/**
 * Set new camera to instance
 * @param {Object} camera New instance of camera from camera.use()
 * @returns {Camera}
 * @private
 */
Camera.prototype._setCamera = function(camera) {
  this._camera = camera;
  return this;
};

/**
 * Set ready status for camera
 * @param {Boolean} isReady
 * @returns {Camera}
 * @private
 */
Camera.prototype._setReady = function(isReady) {
  this._isReady = !!isReady;
  return this;
};

/**
 * Check if camera is ready for shots
 * @returns {Boolean} Returns true if camera is ready for next shot
 */
Camera.prototype.isReady = function() {
  return this._isReady;
};

/**
 * Take picture from camera
 * @returns {Promise}
 */
Camera.prototype.takePicture = function() {
  var defer = Q.defer();

  if (!this.isReady()) {
    return defer.reject('Camera is not ready');
  }

  this._getCamera().takePicture(function(error, image) {
    return error ? defer.reject(error) : defer.resolve(image);
  });

  return defer.promise;
};

/**
 * Destroy current camera connection
 */
Camera.prototype.destroy = function() {
  this._getCamera().disable();
};

module.exports = Camera;

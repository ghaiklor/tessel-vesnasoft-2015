var EventEmitter = require('events').EventEmitter;
var util = require('util');
var bluebird = require('bluebird');
var tessel = require('tessel');
var camera = require('camera-vc0706');

util.inherits(Camera, EventEmitter);

/**
 * Triggers when camera is ready for shots
 * @this {Camera}
 * @private
 */
function _onCameraReady() {
  this._setReady(true);
  this.emit('ready');
}

/**
 * Wrapper for camera-vc0706
 * @param {Object} config Configuration object for camera
 */
function Camera(config) {
  EventEmitter.call(this);

  this._setReady(false);
  this._setCamera(camera.use(tessel.port[config.port]));
  this._getCamera().on('ready', _onCameraReady.bind(this));

  return this;
}

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
  return new Promise(function(resolve, reject) {
    if (!this.isReady()) {
      return reject('Camera is not ready');
    }

    this._getCamera().takePicture(function(error, image) {
      return error ? reject(error) : resolve(image);
    });
  }.bind(this));
};

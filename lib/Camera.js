var EventEmitter = require('events').EventEmitter;
var util = require('util');
var tessel = require('tessel');
var camera = require('camera-vc0706');

util.inherits(Camera, EventEmitter);

/**
 * Wrapper for camera-vc0706
 * @param {Object} config Configuration object for camera
 */
function Camera(config) {
  EventEmitter.call(this);

  this._setCamera(camera.use(tessel.port[config.port]));
  this._getCamera().on('ready', this.emit.bind(this, 'ready'));

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

Camera.prototype.takePicture = function() {};

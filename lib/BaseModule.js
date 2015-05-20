var util = require('util');
var EventEmitter = require('events').EventEmitter;

util.inherits(BaseModule, EventEmitter);

/**
 * Triggers when native module is ready to work
 * @this {BaseModule}
 * @private
 */
function _onModuleReady() {
  this._setReady(true);
  this.emit('ready');
}

/**
 * Triggers when native module is sets up
 * @this {BaseModule}
 * @private
 */
function _onModuleAfterSet() {
  this.getNativeModule().on('ready', _onModuleReady.bind(this));
}

/**
 * Base module for tessel
 * @returns {BaseModule}
 */
function BaseModule() {
  EventEmitter.call(this);

  this._setReady(false);
  this.on('module:after:set', _onModuleAfterSet.bind(this));
}

/**
 * Get current native module
 * @returns {Object}
 */
BaseModule.prototype.getNativeModule = function () {
  this.emit('module:before:get', this._module);
  return this._module;
};

/**
 * Set new native module
 * @param {Object} module New instance of native module
 * @returns {BaseModule}
 */
BaseModule.prototype.setNativeModule = function (module) {
  this.emit('module:before:set', module);
  this._module = module;
  this.emit('module:after:set', module);

  return this;
};

/**
 * Set ready status for module
 * @param {Boolean} isReady
 * @returns {BaseModule}
 * @private
 */
BaseModule.prototype._setReady = function (isReady) {
  this._isReady = !!isReady;
  return this;
};

/**
 * Check if module is ready to work
 * @returns {Boolean} Returns true if module is ready
 */
BaseModule.prototype.isReady = function () {
  return this._isReady;
};

module.exports = BaseModule;

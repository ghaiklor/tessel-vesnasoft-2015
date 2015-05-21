var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Modules = {
  Accelerometer: require('./modules/AccelerometerModule'),
  Ambient: require('./modules/AmbientModule'),
  Camera: require('./modules/CameraModule'),
  Climate: require('./modules/ClimateModule'),
  Servo: require('./modules/ServoModule')
};

util.inherits(ModuleLoader, EventEmitter);

/**
 * Check every time if all modules is loaded
 * @param {ModuleLoader} moduleLoader
 * @this {ModuleLoader}
 */
function isReady(moduleLoader) {
  return moduleLoader._modulesLeft === 0
    ? moduleLoader.emit('ready', moduleLoader._modules)
    : setTimeout(isReady.bind(this, moduleLoader), 0);
}

/**
 * Wrapper for load all tessel modules
 * @param {Object} config
 * @constructor
 */
function ModuleLoader(config) {
  EventEmitter.call(this);

  this._modulesLeft = 0;
  this._modules = {};

  Object.keys(config).forEach(function (moduleName) {
    if (!Modules[moduleName]) throw new Error(moduleName + ' do not exists');

    this._modulesLeft++;
    this._modules[moduleName] = new Modules[moduleName](config[moduleName]);
    this._modules[moduleName].on('ready', function () {
      this._modulesLeft--;
    }.bind(this));
  }.bind(this));

  setTimeout(isReady.bind(this, this), 0);
}

module.exports = ModuleLoader;

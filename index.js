/**
 * Wrappers for tessel modules
 */
var ModuleLoader = require('./lib/ModuleLoader');
var LEDModule = require('./lib/modules/LEDModule');
var led = new LEDModule().startAnimation();

/**
 * Triggers when all modules is ready to work
 * @param {Object} modules
 * @private
 */
function _onModulesReady(modules) {
  modules.Accelerometer.getNativeModule().on('data', console.log.bind(console.log));
  setTimeout(led.stopAnimation.bind(led), 2000);
}

new ModuleLoader({
  Accelerometer: 'C',
  Ambient: 'B',
  Camera: 'A',
  Climate: 'D'
}).on('ready', _onModulesReady);

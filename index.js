var LEDModule = require('./lib/modules/LEDModule');
var ModuleLoader = require('./lib/ModuleLoader');
var WebSocketServer = require('./lib/WebSocketServer');
var led = new LEDModule();
var server = new WebSocketServer(3000);

/**
 * Triggers when all modules is ready to work
 * @param {Object} modules
 * @private
 */
function _onModulesReady(modules) {
  led.startAnimation();
  modules.Accelerometer.getNativeModule().on('data', server.send.bind(server));
}

new ModuleLoader({
  Accelerometer: 'C'
  //Ambient: 'B',
  //Camera: 'A',
  //Climate: 'D'
}).on('ready', _onModulesReady);

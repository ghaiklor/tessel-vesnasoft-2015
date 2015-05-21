var LEDModule = require('./lib/modules/LEDModule');
var ModuleLoader = require('./lib/ModuleLoader');
var WebSocketServer = require('./lib/WebSocketServer');
var led = new LEDModule();
//var server = new WebSocketServer(3000);

/**
 * Triggers when all modules is ready to work
 * @param {Object} modules
 * @private
 */
function _onModulesReady(modules) {
  led.startAnimation();
  modules.Servo.turnAround(1);
  //modules.Accelerometer.getNativeModule().on('data', server.send.bind(server));
}

new ModuleLoader({
  Servo: 'A'
}).on('ready', _onModulesReady);

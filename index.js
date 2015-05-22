var LEDModule = require('./lib/modules/LEDModule');
var ModuleLoader = require('./lib/ModuleLoader');
var WebSocketServer = require('./lib/WebSocketServer');
var led = new LEDModule();
var server = new WebSocketServer(3000);

/**
 * Triggers when accelerometer data is received
 * @param data
 * @private
 */
function _onAccelerometerData(data) {
  server.send({
    type: 'accelerometer',
    data: data
  });
}

/**
 * Triggers when ambient sound level is triggered
 * @param data
 * @private
 */
function _onClapTrigger(data) {
  server.send({
    type: 'restart',
    data: data
  });
}

/**
 * Triggers when all modules is ready to work
 * @param {Object} modules
 * @private
 */
function _onModulesReady(modules) {
  modules.Accelerometer.getNativeModule().on('data', _onAccelerometerData);
  modules.Ambient.onClapTrigger(_onClapTrigger);

  led.startAnimation();
}

new ModuleLoader({
  Accelerometer: 'A',
  Ambient: 'C'
}).on('ready', _onModulesReady);

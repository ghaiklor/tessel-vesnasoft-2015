var LEDModule = require('./lib/modules/LEDModule');
var ModuleLoader = require('./lib/ModuleLoader');
var WebSocketServer = require('./lib/WebSocketServer');
var led = new LEDModule();
var server = new WebSocketServer(3000);
var moduleLoader = new ModuleLoader({
  Accelerometer: 'A',
  Ambient: 'C'
});

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
 * Triggers when clap sound is triggered
 * @param data
 * @private
 */
function _onRestartGame(data) {
  server.send({
    type: 'restart',
    data: data
  });
}

/**
 * Triggers when cheat is activated
 * @private
 */
function _onCheatActivated() {
  server.send({
    type: 'cheat',
    data: {}
  });
}

/**
 * Triggers when all modules is ready to work
 * @param {Object} modules
 * @private
 */
function _onModulesReady(modules) {
  modules.Accelerometer.getNativeModule().on('data', _onAccelerometerData);
  modules.Ambient.onClapTrigger(_onRestartGame, 2);
  modules.Ambient.onClapTrigger(_onCheatActivated, 1);
  led.on('LED2');
}

moduleLoader.on('ready', _onModulesReady);

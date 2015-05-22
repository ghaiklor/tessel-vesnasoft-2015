var LEDModule = require('./lib/modules/LEDModule');
var WiFiModule = require('./lib/modules/WiFiModule');
var ModuleLoader = require('./lib/ModuleLoader');
var WebSocketServer = require('./lib/WebSocketServer');
var led = new LEDModule();
var server = new WebSocketServer(3000);
var wifi = new WiFiModule({
  security: 'wpa2',
  ssid: 'Claptrap',
  password: 'hellowor',
  timeout: 30
});
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

wifi.connect();
moduleLoader.on('ready', _onModulesReady);

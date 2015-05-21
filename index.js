/**
 * Wrappers for tessel modules
 */
var Accelerometer = require('./lib/modules/AccelerometerModule');
var Ambient = require('./lib/modules/AmbientModule');
var Camera = require('./lib/modules/CameraModule');
var ClimateModule = require('./lib/modules/ClimateModule');
var LEDModule = require('./lib/modules/LEDModule');

new LEDModule().startAnimation();

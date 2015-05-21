var Accelerometer = require('./lib/modules/AccelerometerModule');
var Ambient = require('./lib/modules/AmbientModule');
var Camera = require('./lib/modules/CameraModule');
var ClimateModule = require('./lib/modules/ClimateModule');
var LEDModule = require('./lib/modules/LEDModule');

var lights = new LEDModule({
  LED1: true,
  CONN: true
});

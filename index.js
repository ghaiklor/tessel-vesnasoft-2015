'use strict';

var tessel = require('tessel');

var Camera = require('./lib/modules/CameraModule');
var Ambient = require('./lib/modules/AmbientModule');
var Accelerometer = require('./lib/modules/AccelerometerModule');
var ClimateModule = require('./lib/modules/ClimateModule');

var camera = new Camera('A', {
  compression: 0.2,
  resolution: 'vga'
});

var ambient = new Ambient('B');

var accelerometer = new Accelerometer('C');

var climate = new ClimateModule('D');

// var accelerometer = require('accel-mma84').use(tessel.port.C);
// var climate = require('climate-si7020').use(tessel.port.D);

var notificationLED = tessel.led[1].output(0);
//camera.on('ready', function () {
//  notificationLED.output(1);
//  camera.takePicture().then(function (image) {
//    process.sendfile(Date.now() + '.jpg', image);
//  }).catch(console.error.bind(console.error));
//});

climate.on('ready', function () {
  notificationLED.output(1);
  climate.readTemperature().then(console.log.bind(console.log));
});
//
// ambient.on('error', console.error.bind(console.error));
// camera.on('error', console.error.bind(console.error));

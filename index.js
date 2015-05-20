'use strict';

var tessel = require('tessel');

var Camera = require('./lib/Camera');
var Ambient = require('./lib/Ambient');

var camera = new Camera('A', {
  compression: 0.2,
  resolution: 'vga'
});

var ambient = new Ambient('B');

// var accelerometer = require('accel-mma84').use(tessel.port.C);
// var climate = require('climate-si7020').use(tessel.port.D);

var notificationLED = tessel.led[1].output(0);
//camera.on('ready', function () {
//  notificationLED.output(1);
//  camera.takePicture().then(function (image) {
//    process.sendfile(Date.now() + '.jpg', image);
//  }).catch(console.error.bind(console.error));
//});

ambient.on('ready', function () {
  notificationLED.output(1);
  ambient.getNativeModule().on('light', console.log.bind(console.log));
});
//
// ambient.on('error', console.error.bind(console.error));
// camera.on('error', console.error.bind(console.error));

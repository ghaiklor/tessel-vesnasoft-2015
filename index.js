'use strict';

var tessel = require('tessel');

var Camera = require('./lib/Camera');
var camera = new Camera({
  port: 'A',
  compression: 0.2,
  resolution: 'vga'
});

// var ambient = require('ambient-attx4').use(tessel.port.B);
// var accelerometer = require('accel-mma84').use(tessel.port.C);
// var climate = require('climate-si7020').use(tessel.port.D);

var notificationLED = tessel.led[1].output(0);
camera.on('ready', function() {
  notificationLED.output(1);
  camera.takePicture().then(function(image) {
    process.sendfile(Date.now() + '.jpg', image);
  }).catch(console.error.bind(console.error));
});

// ambient.on('ready', function() {
//   notificationLED.output(1);
//
//   ambient.setSoundTrigger(0.1);
//   ambient.on('sound-trigger', function() {
//     ambient.clearSoundTrigger();
//
//     camera.takePicture(function(error, image) {
//       if (error) console.error(error);
//
//       var name = 'picture-' + Date.now() + '.jpg';
//       console.log('Saving as ' + name);
//       process.sendfile(name, image);
//
//       setTimeout(ambient.setSoundTrigger.bind(ambient, 0.1), 5000);
//     });
//   });
// });
//
// ambient.on('error', console.error.bind(console.error));
// camera.on('error', console.error.bind(console.error));

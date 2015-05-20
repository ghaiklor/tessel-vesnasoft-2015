var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port.A);

camera.on('ready', function() {
  console.log('Im ready');
});

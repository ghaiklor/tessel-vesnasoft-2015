var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);
var ambient = require('ambient-attx4').use(tessel.port['B']);

var notificationLED = tessel.led[1].output(0);

ambient.on('ready', function() {
  notificationLED.output(1);

  ambient.setSoundTrigger(0.1);
  ambient.on('sound-trigger', function() {
    ambient.clearSoundTrigger();

    camera.takePicture(function(error, image) {
      if (error) console.error(error);

      var name = 'picture-' + Date.now() + '.jpg';
      console.log('Saving as ' + name);
      process.sendfile(name, image);

      setTimeout(ambient.setSoundTrigger.bind(ambient, 0.1), 5000);
    });
  });
});

ambient.on('error', console.error.bind(console.error));
camera.on('error', console.error.bind(console.error));

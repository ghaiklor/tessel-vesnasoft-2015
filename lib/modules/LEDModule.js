var tessel = require('tessel');

/**
 * Object mapping for LEDs on tessel board
 * @type {Object}
 */
var LEDS = {
  LED1: tessel.led[0],
  LED2: tessel.led[1],
  ERROR: tessel.led[2],
  CONN: tessel.led[3]
};

/**
 * Wrapper for LEDs
 * @constructor
 */
function LEDModule(config) {
  this.offAll();
  Object.keys(config).forEach(function (ledName) {
    if (LEDS[ledName] && config[ledName]) {
      this.on(ledName);
    }
  }.bind(this));
}

/**
 * Turn on all LEDs
 * @returns {LEDModule}
 */
LEDModule.prototype.onAll = function () {
  Object.keys(LEDS).forEach(this.on);
  return this;
};

/**
 * Turn off all LEDs
 * @returns {LEDModule}
 */
LEDModule.prototype.offAll = function () {
  Object.keys(LEDS).forEach(this.off);
  return this;
};

/**
 * Turn on light
 * @param {String} ledName
 * @returns {LEDModule}
 */
LEDModule.prototype.on = function (ledName) {
  if (!LEDS[ledName]) throw new Error(ledName + ' is not founded');

  LEDS[ledName].output(1);
  return this;
};

/**
 * Turn off light
 * @param {String} ledName
 * @returns {LEDModule}
 */
LEDModule.prototype.off = function (ledName) {
  if (!LEDS[ledName]) throw new Error(ledName + ' is not founded');

  LEDS[ledName].output(0);
  return this;
};

module.exports = LEDModule;

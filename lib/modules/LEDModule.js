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
 * Animate process for LEDs
 * @param {Number} timeBetweenLightOn
 * @this {LEDModule}
 */
function animate(timeBetweenLightOn) {
  if (!this.isAnimated()) {
    return this;
  }

  setTimeout(this.on.bind(this, 'ERROR'), 0);
  setTimeout(this.on.bind(this, 'CONN'), timeBetweenLightOn);
  setTimeout(this.on.bind(this, 'LED1'), 2 * timeBetweenLightOn);
  setTimeout(this.on.bind(this, 'LED2'), 3 * timeBetweenLightOn);
  setTimeout(this.off.bind(this, 'ERROR'), 4 * timeBetweenLightOn);
  setTimeout(this.off.bind(this, 'CONN'), 5 * timeBetweenLightOn);
  setTimeout(this.off.bind(this, 'LED1'), 6 * timeBetweenLightOn);
  setTimeout(this.off.bind(this, 'LED2'), 7 * timeBetweenLightOn);
}

/**
 * Wrapper for LEDs
 * @constructor
 */
function LEDModule(config) {
  config = config || {};

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

/**
 * Set animated property on instance
 * @param {Boolean} isAnimated
 * @returns {LEDModule}
 * @private
 */
LEDModule.prototype._setAnimated = function (isAnimated) {
  this._isAnimated = !!isAnimated;
  return this;
};

/**
 * Check if LEDs is animating now
 * @returns {Boolean}
 */
LEDModule.prototype.isAnimated = function () {
  return this._isAnimated;
};

/**
 * Set animation interval
 * @param interval
 * @returns {LEDModule}
 * @private
 */
LEDModule.prototype._setAnimationInterval = function (interval) {
  this._animationInterval = interval;
  return this;
};

/**
 * Get animation interval
 * @returns {*}
 * @private
 */
LEDModule.prototype._getAnimationInterval = function () {
  return this._animationInterval;
};

/**
 * Clear animation interval
 * @private
 */
LEDModule.prototype._clearAnimationInterval = function () {
  clearInterval(this._getAnimationInterval());
};

/**
 * Animate loading process
 * @returns {LEDModule}
 */
LEDModule.prototype.startAnimation = function (timeInterval, timeBetween) {
  timeInterval = timeInterval || 1000;
  timeBetween = timeBetween || timeInterval / 8;

  this._clearAnimationInterval();

  this._setAnimated(true);
  this._setAnimationInterval(setInterval(animate.bind(this, timeBetween), timeInterval));
  return this;
};

/**
 * Stop animation
 * @returns {LEDModule}
 */
LEDModule.prototype.stopAnimation = function () {
  this._setAnimated(false);
  return this;
};

module.exports = LEDModule;

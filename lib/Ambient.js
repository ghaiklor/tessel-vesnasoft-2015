var EventEmitter = require('events').EventEmitter;
var util = require('util');
var Q = require('q');
var tessel = require('tessel');
var ambientAttx4 = require('ambient-attx4');

function Ambient(config) {
  EventEmitter.call(this);


}

Ambient.prototype._setModule = function(module) {
  this._module = module;
  return this;
};

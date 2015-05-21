var ws = require('nodejs-websocket');

/**
 * Returns Server
 * @param {String} port
 * @returns {Object}
 */
function WebSocketServer(port) {
  this._setServer(ws.createServer().listen(port));
}

/**
 * Get native server
 * @returns {*}
 * @private
 */
WebSocketServer.prototype._getServer = function () {
  return this._server;
};

/**
 * Set new native server
 * @param server
 * @returns {WebSocketServer}
 * @private
 */
WebSocketServer.prototype._setServer = function (server) {
  this._server = server;
  return this;
};

/**
 * Send message to all connections
 * @param {*} data
 * @returns {WebSocketServer}
 */
WebSocketServer.prototype.send = function (data) {
  this._getServer().connections.forEach(function (connection) {
    connection.sendText(JSON.stringify(data));
  });

  return this;
};

module.exports = WebSocketServer;

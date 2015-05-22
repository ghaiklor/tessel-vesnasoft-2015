var ws = require('nodejs-websocket');

/**
 * Triggers when connections is established
 * @param connection
 * @private
 */
function _onConnection(connection) {
  connection.on('close', console.log.bind(console.log, 'Connection is closed - '));
}

/**
 * Returns Server
 * @param {String} port
 * @returns {Object}
 */
function WebSocketServer(port) {
  this._setServer(ws.createServer().listen(port));
  this._getServer().on('connection', _onConnection);
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

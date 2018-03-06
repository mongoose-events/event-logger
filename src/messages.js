'use strict'

var messages = {
  connected: '[info] %date connected to mongodb://%host:%port/%database',
  connecting: '[info] %date connecting to mongodb://%host:%port/%database',
  disconnected: '[info] %date disconnected from mongodb://%host:%port/%database',
  error: '[error] %date error on mongodb://%host:%port/%database',
  open: '[info] %date open mongodb://%host:%port/%database',
  reconnected: '[info] %date reconnected to mongodb://%host:%port/%database'
}

module.exports = messages

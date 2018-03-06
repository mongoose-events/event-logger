'use strict'

var message_matches = {
  connected: 'connected to mongodb://localhost:27017/mydb',
  connecting: 'connecting to mongodb://localhost:27017/mydb',
  disconnected: 'disconnected from mongodb://localhost:27017/mydb',
  error: 'error on mongodb://localhost:27017/mydb',
  open: 'open mongodb://localhost:27017/mydb',
  reconnected: 'reconnected to mongodb://localhost:27017/mydb'
}

module.exports = message_matches

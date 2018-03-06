'use strict';

var createEventLogger = require( '../src/index' )
var db_connection = require( './fixture/db-connection' )
var messages = require( '../src/messages' )
var message_matches = require( './fixture/message-matches' )
var sinon = require( 'sinon' )
var spy_console_log = sinon.spy( console, 'log' )
var spy_console_error = sinon.spy( console, 'error' )
var tap = require( 'tap' )

tap.test( 'events with debug output',
  function ( t ) {
    Object.keys( messages ).forEach(
      function ( event_type ) {
        spy_console_error.resetHistory()
        spy_console_log.resetHistory()

        createEventLogger( event_type, db_connection )()

        if ( event_type === 'error' ) {
          t.match(
            spy_console_error.getCall( 0 ).args[ 0 ],
            message_matches[ event_type ],
            '`%type` should console.error a message that contains `%match`'
              .replace( '%type', event_type )
              .replace( '%match', message_matches[ event_type ] )
          )
        } else {
          t.match(
            spy_console_log.getCall( 0 ).args[ 0 ],
            message_matches[ event_type ],
            '`%type` should console.log a message that contains `%match`'
              .replace( '%type', event_type )
              .replace( '%match', message_matches[ event_type ] )
          )
        }
      }
    )

    t.end()
  }
)

tap.test( 'connectedEvent with custom logger',
  function ( t ) {
    var logger = {
      log: function ( msg ) {
        console.log( 'CustomLogger: ' + msg )
      }
    }

    spy_console_log.resetHistory()
    createEventLogger( 'connected', db_connection, logger )()

    t.match(
      spy_console_log.getCall( 0 ).args[ 0 ],
      'CustomLogger',
      'should console.log a message that contains `CustomLogger`'
    )

    t.end()
  }
)

tap.test( 'unknown event',
  function ( t ) {
    t.throws(
      function () {
        createEventLogger( 'unknown', db_connection )()
      },
      new Error( 'message type [ unknown ] not supported' )
    )

    t.end()
  }
)

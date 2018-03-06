'use strict'

var messages = require( './messages' )

/**
 * @param {string} event_type
 * @param {Object} db_connection
 * @param {string} [custom_logger]
 *
 * @returns {logEvent}
 * @throws {Error}
 */
function createEventLogger( event_type, db_connection, custom_logger ) {
  var logger = custom_logger || console;

  if ( !messages[ event_type ] ) {
    throw new Error(
      'message type [ %type ] not supported'
        .replace( '%type', event_type )
    )
  }

  /**
   * @returns {undefined}
   */
  function logEvent() {
    if ( event_type === 'error' ) {
      logger.error(
        messages[ event_type ]
          .replace( '%date', new Date() )
          .replace( '%host', db_connection.host )
          .replace( '%port', db_connection.port )
          .replace( '%database', db_connection.name )
      )

      return
    }

    logger.log(
      messages[ event_type ]
        .replace( '%date', new Date() )
        .replace( '%host', db_connection.host )
        .replace( '%port', db_connection.port )
        .replace( '%database', db_connection.name )
    )
  }

  return logEvent
}

module.exports = createEventLogger;

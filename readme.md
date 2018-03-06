# mongoose-events-logger
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![NSP Status][nsp-image]][nsp-url]

creates a mongoose event handler that logs mongoose events for the given event type using `console.log` and `console.error`.

## table of contents
* [installation](#installation)
* [api](#api)
    * [event types](#event-types)
* [usage](#usage)
    * [basic](#basic)
    * [with a custom logger](#with-a-custom-logger)
* [license](#license)

## installation
```javascript
npm install mongoose-events-event-logger
```

## api
```javascript
/**
 * @param {string} event_type
 * @param {Object} db_connection
 * @param {Object} [custom_logger]
 *
 * @return {Function} logEvent
 */
createEventLogger( event_type, db_connection, custom_logger )
```

### event types
* connected
* connecting
* disconnected
* error
* open
* reconnected

## usage
add an event logger to the mongoose db connection for each event type you want to log. the event logger will default to using the `console` to log events, however, you can optionally pass in your own logging service.

the log message is composed using `new Date()` and the db connection info; e.g. `[info] %date connected to mongodb://%host:%port/%database`

### basic
```javascript
var createEventLogger = require( 'mongoose-events-event-logger' )
var db

db = mongoose.connection
db.on( 'connected', createEventLogger( 'connected', db ) )
```

### with a custom logger
```javascript
var eventLogger = require( 'mongoose-events-event-logger' )
var db

// logging service needs to have a .log( arg1[, arg2[, ...] ] ) method
var logger = require( 'your-custom-logger' )

db = mongoose.connection
db.on( 'connected', createEventLogger( 'connected', db, logger ) )
```

## license
[MIT License][mit-license]

[coveralls-image]: https://coveralls.io/repos/github/mongoose-events/event-logger/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/mongoose-events/event-logger?branch=master
[mit-license]: https://raw.githubusercontent.com/mongoose-events/event-logger/master/license.txt
[npm-image]: https://img.shields.io/npm/v/mongoose-events-event-logger.svg
[npm-url]: https://www.npmjs.com/package/mongoose-events-event-logger
[nsp-image]: https://nodesecurity.io/orgs/mongoose-events/projects/2cd53174-2718-4f24-b6bf-992cac533ca4/badge
[nsp-url]: https://nodesecurity.io/orgs/mongoose-events/projects/2cd53174-2718-4f24-b6bf-992cac533ca4
[travis-image]: https://travis-ci.org/mongoose-events/event-logger.svg?branch=master
[travis-url]: https://travis-ci.org/mongoose-events/event-logger

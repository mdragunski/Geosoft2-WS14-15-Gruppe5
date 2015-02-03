'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');

module.exports = _.extend(
	require('./parsers/parsers.app.server.controller'),
	require('./parsers/parsers.builder.server.controller'),
	require('./parsers/parsers.parser.server.controller'),
	require('./parsers/parsers.getMeta.server.controller')
);
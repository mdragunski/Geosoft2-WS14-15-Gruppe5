'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Parser Schema
 */
var ParserSchema = new Schema({
});

mongoose.model('Parser', ParserSchema);
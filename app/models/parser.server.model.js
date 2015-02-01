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
	// Parser model fields   
	// ...
});

mongoose.model('Parser', ParserSchema);
'use strict';

module.exports = function(app) {
	var parser = require('../../app/controllers/parser.server.controller');
	app.route('/parser/:url').get(parser.parseRouter);
};
'use strict';

module.exports = function(app) {
	app.route('/parser/:url').get( parsers.parseRouter);
};
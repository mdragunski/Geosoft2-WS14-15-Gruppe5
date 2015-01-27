'use strict';

module.exports = function(app) {
	var comments = require('../controllers/comments.server.controller');

	/* GET search for comments by API */
	app.route('/api/v1/search').get(comments.list);

};

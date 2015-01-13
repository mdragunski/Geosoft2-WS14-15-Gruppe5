'use strict';

module.exports = function(app) {
	var comments = require('../controllers/comments.server.controller');

	/* POST comments listing */
	app.route('/comments').post(comments.create);

	/* GET comments listing */
	app.route('/comments').get(comments.list);

	/* GET comment */
	app.route('/comments/:commentId').get( comments.read);
};

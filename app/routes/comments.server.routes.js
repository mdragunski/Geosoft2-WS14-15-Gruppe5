// var express = require('express');
// var router = express.Router();

module.exports = function(app) {

	var comments = require('../controllers/comments.server.controller');

	/* POST comments listing */
	app.route('/comments').post(comments.post);

	/* GET comments listing */
	app.route('/comments').get(comments.get);
}
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Comment = mongoose.model("Comments");

/**
 * Create a Comment
 */
exports.create = function(req, res) {
	var comment = new Comment(req.body);
	comment.save();
	res.jsonp(comment);
};

/**
 * Show the current Comment
 */
exports.read = function(req, res) {
	Comment.load(req.params.commentId, function(err, comment){
		res.jsonp(comments);
	});
};


/**
 * Search for Comments by API
 */
exports.search = function(req, res) {
	var searchReq = req.query.q;
	var count = req.query.count
	Comment.textSearch(searchReq, function(err, output){
		if (err) return handleError(err);
		else {
			var results = output.results;
			// var returnval = results.select('obj');
                	res.jsonp(results);
		}
  	});
};
		


/**
 * List of Comments
 */
exports.list = function(req, res) {
        Comment.find().exec(function(err, comments)
                {
                        res.jsonp(comments);
                });
};

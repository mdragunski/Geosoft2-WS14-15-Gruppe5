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
	var commentRequest = req.body;
	if(commentRequest.url){
		if(commentRequest.text){
			var comment = new Comment(req.body);
			comment.save();
			res.jsonp(comment);
		}
		else {
			res.status(400).send({
				message: 'Comment-Text is missing.'
			});
		}
	}
	else {
		res.status(400).send({
			message: 'Comment-URL is missing.'
		});
	}
};

/**
 * Show the aquired comment or if more comments exist for the same
 * ressource a whole thread is returned  
 */
exports.read = function(req, res) {
	Comment.getComment(req.params.commentId, function(err, comment){
    	Comment.find({ 'url' : comment.url}, function(err, thread) {
		res.jsonp(thread);
		});
	});
};

/**
 * Update a Comment
 */
exports.update = function(req, res) {

};

/**
 * Delete an Comment
 */
exports.delete = function(req, res) {

};

/**
 * Return all Comments in database
 */
exports.list = function(req, res) {
        Comment.find().exec(function(err, comments)
                {
                        res.jsonp(comments);
                });
};


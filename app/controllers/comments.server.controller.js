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


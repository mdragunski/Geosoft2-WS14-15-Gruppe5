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
 * List of Comments
 */
exports.list = function(req, res) {
        Comment.find().exec(function(err, comments)
                {
                        res.jsonp(comments);
                });
};

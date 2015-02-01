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
	var resPath = req.originalUrl;
	var hostname = req.hostname;
	var searchReq = req.query.q;
	var commentVals = [];
	var commentFct = '/comments/';
	var srvUrlType = 'http://';
	var srvUrl = srvUrlType += hostname;
	var resBaseUrl = srvUrl;
	var resUrl = resBaseUrl += req.originalUrl;
        var commentFctUrl = srvUrl += commentFct;
	var count = parseInt(req.query.count);
	var searchoptions = {};
	if (!isNaN(count)) {
		if (count!=0){
			var searchoptions = { limit: count };
		}
		else {
			var noComment = { ressource: resUrl, comments: []};
			res.jsonp(noComment);
		}
	}
	Comment.textSearch(searchReq, searchoptions, function(err, output){
		if (err) return res.status(400).send({
                	message: 'No search-request given (search?q=searchtext)'
		});
		else {
			var resultObjects = output.results;
			var resultItems = Object.keys(resultObjects);
			resultItems.forEach(function(item) {
				var commentId = resultObjects[item].obj._id;
				var commentIdUrl = commentFctUrl += commentId;
				var commentText = resultObjects[item].obj.text;
				var commentRating = resultObjects[item].obj.rating;
				var commentUrl = resultObjects[item].obj.url;
				var comment = { id: commentIdUrl, text: commentText, rating: commentRating, itemUnderReview: commentUrl };
				commentVals.push(comment);
			});
			var returnVal = { resource: resUrl, comments: commentVals };
                	res.jsonp(returnVal);
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

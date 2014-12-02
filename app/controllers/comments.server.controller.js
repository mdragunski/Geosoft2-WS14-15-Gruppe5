require('../models/comments.server.model');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

exports.post = function(req, res){
	var comment = new Comment(req.body);
	comment.save();
	res.jsonp(comment);	
}	

exports.get = function(req, res){
	Comment.find().exec(function(err, comments)
		{
		res.jsonp(comments);
		});
}

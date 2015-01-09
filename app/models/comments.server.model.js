'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

/**
 * Comments Schema
 */
var CommentsSchema = new Schema({
	url: { type: String, required: true },
	creationdate: { type: Date, default: Date.now },
	text: { type: String, required: true },
	rating: {type: Number, min: 0, max: 5, default: 0},
	timereference: Date,
	georeference: String,
	tags: [String],
	additionalressources: [String]
});

/**
 * Virtual Field for the commentId
 */
CommentsSchema.virtual('commentId').get(function() {
    return this._id;
});

/**
 * Function for returning comments
 */
CommentsSchema.getComment = {
	load: function(id, cb){
		this.findOne({_id : id}).exec(cb);
		}
};

mongoose.model('Comments', CommentsSchema);

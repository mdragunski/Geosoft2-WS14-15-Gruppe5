'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	GeoJSON = require('mongoose-geojson-schema'),
	textSearch = require('mongoose-text-search'),
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
	georeference: GeoJSON.Feature,
	tags: [String],
	additionalressources: [String],
	username: { type: String, default: 'anonymous' }
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

/**
* Add text search capabilities to the comments-model
 */
CommentsSchema.plugin(textSearch);


/**
* Add API-Query capabilities to the comments model
 */
CommentsSchema.plugin(apiQuery);

/**
* Add a text index to the tags array
 */
CommentsSchema.index({ url: 'text', text: 'text', tags: 'text' });

mongoose.model('Comments', CommentsSchema);

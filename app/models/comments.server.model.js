'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	GeoJSON = require('mongoose-geojson-schema'),
	textSearch = require('mongoose-text-search'),
	ObjectId = Schema.ObjectId;

	var TimeReferenceSchema = new Schema({
		startdate:{type: Date,default:null},
		enddate: {type:Date,default:null}
	});

/**
 * Comments Schema
 */
var CommentsSchema = new Schema({
	url: { type: String, required: true },
	creationdate: { type: Date, default: Date.now },
	text: { type: String, required: true },
	rating: {type: Number, min: 0, max: 5, default: 0},
	timereference:[TimeReferenceSchema],
	georeference: GeoJSON.Feature,
	tags: [String],
	additionalressources: [String],
	username: { type: String, default: 'anonymous' },
	usertype: {type: String, default: 'anonymous'}
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
CommentsSchema.statics.getComment = function(id, cb){
    return this.findOne({_id : id}).exec(cb);
};


/**
* Add text search capabilities to the comments-model
 */
CommentsSchema.plugin(textSearch);

/**
* Add a text index to the tags array
 */
CommentsSchema.index({ url: 'text', text: 'text', tags: 'text' });

mongoose.model('Comments', CommentsSchema);

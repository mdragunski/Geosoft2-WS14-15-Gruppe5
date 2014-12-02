var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({ 
   url: { type: String, required: true },
   creationdate: { type: Date, default: Date.now },
   text: { type: String, required: true },
   rating: {type: Number, min: 0, max: 5, default: 0},
   timereference: Date,
   georeference: String,
   tags: [String],
   additionalressources: [String]
});

CommentSchema.virtual('commentId').get(function() {
    return this._id;
});

CommentSchema.getComment = {
	load: function(id, cb){
		this.findOne({_id : id}).exec(cb);
		}
};

mongoose.model('Comment', CommentSchema);
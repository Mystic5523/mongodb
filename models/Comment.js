
// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create comment schema
var CommentSchema = new Schema({
    // title is a required string
    comment: {
        type: String,
        required: true
        // required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

// Create the comment model with the CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the model
module.exports = Comment;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
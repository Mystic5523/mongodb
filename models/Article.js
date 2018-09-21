var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    summary: {
        type: String,
    },
    link: {
        type: String
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    saved: {
        type: Boolean,
        default: false
    }
});

var article = mongoose.model("article", articleSchema);

module.exports = article;
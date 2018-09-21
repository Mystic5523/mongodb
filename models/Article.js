// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var articleSchema = new Schema({
    // title is a required string
    title: {
        type: String,
        unique: true
        // required: true
    },

    summary: {
        type: String,

    },
    // link is a required string
    link: {
        type: String
        // required: true
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

// Create the Article model with the ArticleSchema
var article = mongoose.model("article", articleSchema);

// Export the model
module.exports = article;
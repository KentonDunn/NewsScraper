var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    summary:{
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true,
    }, 
    saved:{
        type: Boolean,
        default: false
    },

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

/*I'm thinking that this db should actually behave as the library database from activity Intro-populate
maybe it only needs to hold the article ID from the scraped data?*/
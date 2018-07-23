var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleLibrarySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Article"
        }
    ]
});

var ArticleLibrary = mongoose.model("ArticleLibrary", ArticleLibrarySchema);

module.exports = ArticleLibrary;
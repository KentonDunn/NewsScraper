//this database will hold all of the scraped articles from nytimes.com

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ScrapedDataSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

var ScrapedData = mongoose.model("ScrapedData", ScrapedDataSchema);

module.exports = ScrapedData;
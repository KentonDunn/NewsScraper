var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var axios = require("axios");

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

var db = require("./models");
var PORT = 3000 || process.env.PORT;

// var databaseUrl = "scraper";
// var collections = ["scrapedData"]
// var db = mongojs(databaseUrl, collections);

// db.on("error", function (error) {
//     console.log("Database Error:", error)
// });

mongoose.connect("mongodb://localhost/scraper");


console.log("\n******************\n" +
    "Grabbing every thread name and link\n" +
    "from newyorktimes.com:" +
    "\n******************************\n");



app.get("/", function (req, res) {
    res.send(index.html);
});



app.get("/scrape", function (req, res) {
    request("https://www.newyorktimes.com", function (error, response, html) {
        var $ = cheerio.load(html);

        var result = {};

        //this scrape works in some sections of the website and in others it returns undefined information
        //since it works for most, I'm going to stick with it. 
        $("article.theme-summary").each(function (i, element) {
            result.title = $(element).find("h2.story-heading").text().replace(/\\n+/g, '').trim();
            result.link = $(element).find("h2.story-heading").children().attr("href");
            result.summary = $(element).find("p.summary").text().replace(/\\n+/g, '').trim();

            if (result.title && result.summary && result.link) {
                db.Article.create(result)
                    .then(function (dbArticle) {
                        //console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            }
        });


    });
    res.send("Scrape Complete");

});

app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/articles/:id", function (req, res) {
    db.Article.findOne({
            _id: req.params.id
        })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/articles/:id", function (re, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbNote._id
            }, {
                new: true
            });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
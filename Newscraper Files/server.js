var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
var mongojs = require("mongojs");

var app = express();

var databaseUrl = "scraper";
var collections = ["scrapedData"]
var db = mongojs(databaseUrl, collections);

app.use(express.static("public"));

console.log("\n******************\n" +
    "Grabbing every thread name and link\n" +
    "from newyorktimes.com:" +
    "\n******************************\n");

// request("https://www.newyorktimes.com", function (error, response, html) {
//     var $ = cheerio.load(html);

//     var results = [];
//     //this scrape works in some sections of the website and in others it returns undefined information
//     //since it works for most, I'm going to stick with it. 
//     $("article.theme-summary").each(function (i, element) {
//         var title = $(element).find("h2.story-heading").text();
//         var link = $(element).find("h2.story-heading").children().attr("href");
//         var summary = $(element).find("p.summary").text();

//         results.push({
//             title: title,
//             summary: summary,
//             link: link
//         });
//     });

//     console.log(results);
// })


var db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
    console.log("Database Error:", error);
});

app.get("/", function (req, res) {
    res.send(index.html);
});

app.get("/all", function (req, res) {
    db.scrapedData.find({}, function (err, found) {
        if (err) {
            console.log(err);
        } else {
            res.json(found);
        }
    });
});

app.get("/scrape", function (req, res) {
    request("https://www.newyorktimes.com", function (error, response, html) {
        var $ = cheerio.load(html);

        var results = [];
        //this scrape works in some sections of the website and in others it returns undefined information
        //since it works for most, I'm going to stick with it. 
        $("article.theme-summary").each(function (i, element) {
            var title = $(element).find("h2.story-heading").text();
            var link = $(element).find("h2.story-heading").children().attr("href");
            var summary = $(element).find("p.summary").text();

            if (title && summary && link) {
                db.scrapedData.insert({
                    title: title,
                    summary: summary,
                    link: link
                }, function (err, inserted) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(inserted);
                    }
                });
            }
        });


    });
    res.send("Scrape Complete");
})

app.listen(3000, function () {
    console.log("App running on port 3000!");
});
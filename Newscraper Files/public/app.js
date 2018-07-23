   $.getJSON("/scraped", function (data) {
       $(".alert").hide();
       for (var i = 0; i < data.length; i++) {
           if (i > 3) break
           console.log(data);
           $("#articleSpace").append("<div data-id='" + data[i].id + "'class ='card'>" +
               "<div class='card-header'>" +
               "<h3>" +
               "<a class='article-link' target='_blank' rel='noopener noreferrer'" +
               "href='" + data[i].link + "'>" + data[i].title + "</a>" +
               "<a class='btn btn-success save'>Save Article</a></h3></div>" +
               "<div class='card-body'>" + data[i].summary + "</div></div>"
           )

       }
   });

   //save an article to the saved article database
   $(document).on("click", ".save", function () {
       var result = {};

       var thisID = $(this).attr("data-id");


       db.Article.create(result)
           .then(function (dbArticle) {
               console.log(dbArticle);
           })
           .catch(function (err) {
               return res.json(err);
           })
   })

   //save a note to the associated article

   //delete the note

   //delete the article
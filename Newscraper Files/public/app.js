$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data);
        $(".article-container").append("<div data-id='" + data[i].id + "'class ='card'>" +
            "<div class='card-header'>" +
            "<h3>" +
            "<a class='article-link' target='_blank' rel='noopener noreferrer'" +
            "href='" + data[i].link + "'>" + data[i].title + "</a>" +
            "<a class='btn btn-success save'>Save Article</a></h3></div>" +
            "<div class='card-body'>" + data[i].summary + "</div></div>"
        )

    }
});


/* <div data-_id="5b54d9015f9d43001455ee70" class="card">
        <div class="card-header">
          <h3>
            <a class="article-link" target="_blank" rel="noopener noreferrer" href="Link">Article Title goes here</a>
            <a class="btn btn-success save">Save Article</a>
          </h3>
        </div>
        <div class="card-body">Summary Goes Here</div>
      </div> */
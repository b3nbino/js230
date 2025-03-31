$(() => {
  //Setup handlebars templates
  let photosTemplate = Handlebars.compile($("#photos").html());
  let photoInfoTemplate = Handlebars.compile($("#photo_information").html());
  let photoCommentsTemplate = Handlebars.compile($("#photo_comments").html());
  let photoCommentPartial = Handlebars.registerPartial(
    "comment",
    $("#photo_comment").html()
  );

  let photos;

  //Render html for slides, header, and comments
  $.ajax("/photos")
    .done((response) => {
      photos = response;

      //Render all photos slides
      let photosHtml = photosTemplate({ photos });
      document.getElementById("slides").innerHTML = photosHtml;

      //Render current (1st) photo header and comments
      renderHeader(photos[0].id);
      renderComments(photos[0].id);
    })
    .fail(() => {
      console.error("Request unsuccessful: GET /photos");
    });

  //Gets and renders header of specified photo
  function renderHeader(photoId) {
    //Find specified photo's json from photos array
    let photoJson = photos.filter((obj) => obj.id === photoId)[0];

    //Create and render html of header
    let headerHtml = photoInfoTemplate(photoJson);
    document.getElementById("photo_header").innerHTML = headerHtml;
  }

  //Gets and renders comment section of specified photo
  function renderComments(photoId) {
    $.ajax(`/comments?photo_id=${photoId}`).done((response) => {
      let comments = response;

      let commentsHtml = photoCommentsTemplate({ comments });
      document.querySelector("#comments > ul").innerHTML = commentsHtml;
    });
  }
});

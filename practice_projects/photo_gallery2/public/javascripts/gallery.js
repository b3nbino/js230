$(() => {
  //Setup handlebars templates
  let photosTemplate = Handlebars.compile($("#photos").html());
  let photoInfoTemplate = Handlebars.compile($("#photo_information").html());
  let photoCommentsTemplate = Handlebars.compile($("#photo_comments").html());
  let photoCommentPartial = Handlebars.registerPartial(
    "photo_comment",
    $("#photo_comment").html()
  );

  //GET /photos and render html for slides and description (header)
  $.ajax("/photos")
    .done((response) => {
      let photos = response;

      let photosHtml = photosTemplate({ photos });
      document.getElementById("slides").innerHTML = photosHtml;

      let headerHtml = photoInfoTemplate(photos[0]);
      document.getElementById("photo_header").innerHTML = headerHtml;
    })
    .fail(() => {
      console.error("Request unsuccessful: GET /photos");
    });
});

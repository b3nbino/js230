$(() => {
  //Setup handlebars templates
  let photosTemplate = Handlebars.compile($("#photos").html());
  let photoInfoTemplate = Handlebars.compile($("#photo_information").html());
  let photoCommentsTemplate = Handlebars.compile($("#photo_comments").html());
  let photoCommentPartial = Handlebars.registerPartial(
    "photo_comment",
    $("#photo_comment").html()
  );

  let photos;

  $.ajax("/photos")
    .done((response) => {
      photos = response;
      let photosHtml = photosTemplate({ photos });

      document.getElementById("slides").innerHTML = photosHtml;
    })
    .fail(() => {
      console.error("Request unsuccessful: GET /photos");
    });
});

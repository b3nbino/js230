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
  let currPhotoId;
  let $prevButton = $(".prev");
  let $nextButton = $(".next");

  //Gets and renders header of specified photo
  function renderHeader(photoId) {
    //Find specified photo's json from photos array
    let photoJson = photos.filter((obj) => obj.id === photoId)[0];

    //Create and render header html
    let headerHtml = photoInfoTemplate(photoJson);
    document.getElementById("photo_header").innerHTML = headerHtml;
  }

  //Gets and renders comment section of specified photo
  function renderComments(photoId) {
    $.ajax(`/comments?photo_id=${photoId}`).done((response) => {
      let comments = response;

      //Create and render comments html
      let commentsHtml = photoCommentsTemplate({ comments });
      document.querySelector("#comments > ul").innerHTML = commentsHtml;
    });
  }

  //Returns jQuery element containing only the figure element with the passed in id
  function getPhoto(photoId) {
    return $("figure").filter((_, fig) => Number(fig.dataset.id) === photoId);
  }

  //Returns id of photo previous to the id passed in
  function getPrevPhotoId(currId) {
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].id === currId) {
        return photos[i - 1] ? photos[i - 1].id : photos[photos.length - 1].id;
      }
    }
  }

  //Returns id of photo next to the id passed in
  function getNextPhotoId(currId) {
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].id === currId) {
        return photos[i + 1] ? photos[i + 1].id : photos[0].id;
      }
    }
  }

  //Inital render html for slides, header, and comments
  $.ajax("/photos")
    .done((response) => {
      photos = response;

      //Render all photos slides
      let photosHtml = photosTemplate({ photos });
      document.getElementById("slides").innerHTML = photosHtml;

      //Render current (1st) photo header and comments
      currPhotoId = photos[0].id;
      renderHeader(currPhotoId);
      renderComments(currPhotoId);
    })
    .fail(() => {
      console.error("Request unsuccessful: GET /photos");
    });

  $prevButton.on("click", (event) => {
    event.preventDefault();

    //Get the current photo
    let $currPhoto = getPhoto(currPhotoId);

    //Change currPhotoId to reflect desired changes to DOM
    currPhotoId = getPrevPhotoId(currPhotoId);

    //Get the previous photo
    let $prevPhoto = getPhoto(currPhotoId);

    //Perform photo swap
    $currPhoto.fadeOut();
    $prevPhoto.fadeIn();

    //Perform photo info and comments swap
    renderHeader(currPhotoId);
    renderComments(currPhotoId);
  });

  $nextButton.on("click", (event) => {
    event.preventDefault();

    //Get the current photo
    let $currPhoto = getPhoto(currPhotoId);

    //Change currPhotoId to reflect desired changes to DOM
    currPhotoId = getNextPhotoId(currPhotoId);

    //Get the previous photo
    let $nextPhoto = getPhoto(currPhotoId);

    //Perform photo swap
    $currPhoto.fadeOut();
    $nextPhoto.fadeIn();

    //Perform photo info and comments swap
    renderHeader(currPhotoId);
    renderComments(currPhotoId);
  });
});

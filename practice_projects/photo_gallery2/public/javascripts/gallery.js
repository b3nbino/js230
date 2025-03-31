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

  class Slideshow {
    constructor() {
      this.$currPhoto = this.getPhoto(currPhotoId);
      this.$prevPhoto = this.getPhoto(this.getPrevPhotoId(currPhotoId));
      this.$nextPhoto = this.getPhoto(this.getNextPhotoId(currPhotoId));
      this.bindEvents();
    }

    //Adds event listeners to previous and next buttons
    bindEvents() {
      $(".prev").on("click", this.goToPrevPhoto.bind(this));
      $(".next").on("click", this.goToNextPhoto.bind(this));
    }

    //Returns jQuery element containing only the figure element with the passed in id
    getPhoto(photoId) {
      return $("figure").filter((_, fig) => Number(fig.dataset.id) === photoId);
    }

    //Returns id of previous photo
    getPrevPhotoId(currId) {
      for (let i = 0; i < photos.length; i++) {
        if (photos[i].id === currId) {
          return photos[i - 1]
            ? photos[i - 1].id
            : photos[photos.length - 1].id;
        }
      }
    }

    //Returns id of next photo
    getNextPhotoId(currId) {
      for (let i = 0; i < photos.length; i++) {
        if (photos[i].id === currId) {
          return photos[i + 1] ? photos[i + 1].id : photos[0].id;
        }
      }
    }

    goToPrevPhoto(event) {
      event.preventDefault();

      //Perform photo swap
      this.$currPhoto.fadeOut();
      this.$prevPhoto.fadeIn();

      //Change currPhotoId and object properties to reflect desired changes to DOM
      currPhotoId = this.getNextPhotoId(currPhotoId);
      this.$currPhoto = this.getPhoto(currPhotoId);
      this.$prevPhoto = this.getPhoto(this.getPrevPhotoId(currPhotoId));
      this.$nextPhoto = this.getPhoto(this.getNextPhotoId(currPhotoId));

      //Perform photo info and comments swap
      renderHeader(currPhotoId);
      renderComments(currPhotoId);
    }

    goToNextPhoto(event) {
      event.preventDefault();

      //Perform photo swap
      this.$currPhoto.fadeOut();
      this.$nextPhoto.fadeIn();

      //Change currPhotoId and object properties to reflect desired changes to DOM
      currPhotoId = this.getNextPhotoId(currPhotoId);
      this.$currPhoto = this.getPhoto(currPhotoId);
      this.$prevPhoto = this.getPhoto(this.getPrevPhotoId(currPhotoId));
      this.$nextPhoto = this.getPhoto(this.getNextPhotoId(currPhotoId));

      //Perform photo info and comments swap
      renderHeader(currPhotoId);
      renderComments(currPhotoId);
    }
  }

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

  //Inital render html for slides, header, and comments
  $.ajax("/photos")
    .done((response) => {
      photos = response;

      //Render all photo slides
      let photosHtml = photosTemplate({ photos });
      document.getElementById("slides").innerHTML = photosHtml;

      //Render current (1st) photo header and comments
      currPhotoId = photos[0].id;
      renderHeader(currPhotoId);
      renderComments(currPhotoId);

      //Enable slideshow functionality
      let slideshow = new Slideshow();
    })
    .fail(() => {
      console.error("Request unsuccessful: GET /photos");
    });
});

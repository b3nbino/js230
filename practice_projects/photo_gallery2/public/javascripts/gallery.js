$(() => {
  //Setup handlebars templates
  let photosTemplate = Handlebars.compile($("#photos").html());
  let photoInfoTemplate = Handlebars.compile($("#photo_information").html());
  let photoCommentsTemplate = Handlebars.compile($("#photo_comments").html());
  let commentTemplate = Handlebars.compile($("#photo_comment").html());
  Handlebars.registerPartial("comment", $("#photo_comment").html());

  let photos;

  class Slideshow {
    constructor(currPhotoId) {
      this.currPhotoId = currPhotoId;
      this.$currPhoto = this.getPhoto(this.currPhotoId);
      this.$prevPhoto = this.getPhoto(this.getPrevPhotoId(this.currPhotoId));
      this.$nextPhoto = this.getPhoto(this.getNextPhotoId(this.currPhotoId));
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
    getPrevPhotoId() {
      for (let i = 0; i < photos.length; i++) {
        if (photos[i].id === this.currPhotoId) {
          return photos[i - 1]
            ? photos[i - 1].id
            : photos[photos.length - 1].id;
        }
      }
    }

    //Returns id of next photo
    getNextPhotoId() {
      for (let i = 0; i < photos.length; i++) {
        if (photos[i].id === this.currPhotoId) {
          return photos[i + 1] ? photos[i + 1].id : photos[0].id;
        }
      }
    }

    goToPrevPhoto(event) {
      event.preventDefault();

      //Perform photo swap
      this.$currPhoto.fadeOut();
      this.$prevPhoto.fadeIn();

      //Change object properties to reflect desired changes to DOM
      this.currPhotoId = this.getPrevPhotoId();
      this.$currPhoto = this.getPhoto(this.currPhotoId);
      this.$prevPhoto = this.getPhoto(this.getPrevPhotoId());
      this.$nextPhoto = this.getPhoto(this.getNextPhotoId());

      //Perform photo info and comments swap
      renderHeader(this.currPhotoId);
      renderComments(this.currPhotoId);
    }

    goToNextPhoto(event) {
      event.preventDefault();

      //Perform photo swap
      this.$currPhoto.fadeOut();
      this.$nextPhoto.fadeIn();

      //Change and object properties to reflect desired changes to DOM
      this.currPhotoId = this.getNextPhotoId();
      this.$currPhoto = this.getPhoto(this.currPhotoId);
      this.$prevPhoto = this.getPhoto(this.getPrevPhotoId());
      this.$nextPhoto = this.getPhoto(this.getNextPhotoId());

      //Perform photo info and comments swap
      renderHeader(this.currPhotoId);
      renderComments(this.currPhotoId);
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
      renderHeader(photos[0].id);
      renderComments(photos[0].id);

      //Enable slideshow functionality
      let slideshow = new Slideshow(photos[0].id);
    })
    .fail(() => {
      console.error("Request unsuccessful: GET /photos");
    });

  //Like and favorite event handlers
  $("#photo_header").on("click", "a", (event) => {
    event.preventDefault();
    let button = event.target;
    let url = button.getAttribute("href");

    $.ajax(url, {
      method: "POST",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data: "photo_id=" + button.dataset.id,
    }).done((response) => {
      button.textContent = button.textContent.replace(/\d+/, response.total);
      $.ajax("/photos").done((r) => (photos = r));
    });
  });

  let $form = $("#comments > form");
  $form.on("submit", (event) => {
    event.preventDefault();
    let data = $form.serialize();

    $.ajax("/comments/new", {
      method: "POST",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      data,
    }).done((response) => {
      let newComment = $(commentTemplate(response));

      $("#comments > ul").append(newComment);
      document.querySelector("#comments > form").reset();
    });
  });
});

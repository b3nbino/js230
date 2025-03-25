$(() => {
  let $form = $("form");
  let toggleKey;

  $form.on("submit", (event) => {
    event.preventDefault();

    toggleKey = $form.find("input[type='text']").val();

    $(document)
      .off("keypress")
      .on("keypress", (event) => {
        if (event.key !== toggleKey) {
          return;
        }

        $("a").trigger("click");
      });
  });

  $("a").on("click", (event) => {
    event.preventDefault();
    $("#accordion").slideToggle();
  });
});

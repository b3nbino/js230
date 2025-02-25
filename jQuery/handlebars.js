$(() => {
  let post = {
    title: "Lorem ipsum dolor sit amet",
    published: "April 1, 2015",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
    tags: ["Idonno", "What", "Kind", "Ofthing", "Toput", "Here"],
  };
  post.body = "<strong>" + post.body + "</strong>";

  let posts = [post];
  posts.push({
    title: "Lorem ipsum dolor sit amet",
    published: "April 1, 2015",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
  });

  Handlebars.registerPartial("tag", $("#tag").html());
  let postTemplate = Handlebars.compile($("#post").html());
  $("body").append(postTemplate({ posts }));
});

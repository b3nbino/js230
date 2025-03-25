let post = {
  title: "Lorem ipsum dolor sit amet",
  published: "April 1, 2015",
  body: "Sed ut perspiciatis unde omnis <strong>iste natus error</strong> sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
  tags: ["life", "cooking", "summer", "vacation"],
};

let post2 = {
  title: "Lorem ipsum dolor sit amet",
  published: "April 1, 2015",
  body: "Sed ut perspiciatis unde omnis <strong>iste natus error</strong> sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
};

let posts = [];
posts.push(post);
posts.push(post2);

$(() => {
  let postTemplate = Handlebars.compile($("#posts").html());
  Handlebars.registerPartial("tag", $("#tag").html());

  let postHtml = postTemplate({ posts });

  document.body.innerHTML = postHtml;
});

const config = require("./config.js");

const username = document.getElementById("username");
const postContainer = document.getElementById("user-posts");
const msg = document.getElementById("message");
let statusCode;

document.addEventListener("DOMContentLoaded", function () {
  const pathName = window.location.pathname;
  const pathParts = pathName.split("/");
  const userId = pathParts[pathParts.length - 1];

  const url = `${config.apiBaseUrl}/api/v1/user/profile/${userId}`;

  fetch(url)
    .then((res) => {
      statusCode = res.status;
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        username.textContent = data.data.username;

        data.data.Posts.forEach((element) => {
          const post = document.createElement("div");
          post.classList.add(
            "mb-4",
            "p-4",
            "bg-gray-200",
            "rounded-md",
            "shadow-md"
          );

          const title = document.createElement("h3");
          title.classList.add("text-lg", "font-semibold", "mb-2");
          title.textContent = element.title;
          post.appendChild(title);

          const content = document.createElement("p");
          content.textContent = element.content;
          post.appendChild(content);

          postContainer.appendChild(post);
        });
      } else {
        if (statusCode === 409) window.location.href = "/login";
        msg.textContent = "404 User Not Found!";
        alert(data.message);
        console.log(data.statusCode);
      }
    })
    .catch((err) => console.log(err));
});

const goBack = (event) => {
  window.location.href = "/posts";
};

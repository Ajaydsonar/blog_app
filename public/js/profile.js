const username = document.getElementById("username");
const postContainer = document.getElementById("user-posts");
const msg = document.getElementById("message");
let statusCode;

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = Number(urlParams.get("userID"));

  const url = `http://localhost:3000/api/v1/user/profile/${userId}`;

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
          const title = document.createElement("h3");

          title.id = element.post_id;
          title.textContent = element.title;
          post.appendChild(title);

          postContainer.appendChild(post);
        });
      } else {
        // window.location.href = "http://localhost:3000/login";
        // title.textContent = "404 User Not Found!";
        if (statusCode === 409) window.location.href = "/login";

        msg.textContent = "404 User Not Found!";
        alert(data.message);
        console.log(data.statusCode);
      }
    })
    .catch((err) => console.log(err));
});

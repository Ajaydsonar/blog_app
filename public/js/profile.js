const username = document.getElementById("username");
const postContainer = document.getElementById("user-posts");

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = Number(urlParams.get("userID"));

  const url = `http://localhost:3000/api/v1/user/profile/${userId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("ok");

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
        console.log("not ok");
        console.log(data);
      }
    })
    .catch((err) => console.log(err));
});

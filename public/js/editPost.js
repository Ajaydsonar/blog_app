import config from "./config.js";

const title = document.getElementById("title");
const content = document.getElementById("content");
const user = document.getElementById("username");

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");
  const username = urlParams.get("username");
  user.textContent = username;
  console.log(postId);
  const URL = `${config.apiBaseUrl}/api/v1/post/show/${postId}`;

  fetch(URL)
    .then((res) => {
      if (res.status === 409) window.location.href = "/login";
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.success) {
        title.textContent = data.data.title;
        content.textContent = data.data.content;

        title.contentEditable = true;
        content.contentEditable = true;
      } else {
        console.log(data);
        // window.location.href = "";
        alert(data.message);
        title.textContent = "404 Post Not Found!";
      }
    })
    .catch((err) => console.log(err));
});

const save = document.getElementById("save");
const cancel = document.getElementById("cancel");

const savePost = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");

  data = {
    title: title.textContent,
    content: content.textContent,
  };

  const URL = `${config.apiBaseUrl}/api/v1/post/update/${postId}`;
  fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        alert(data.message);
        window.location.href = `/profile/${user.textContent}`;
      } else {
        alert(data.message);
      }
    })
    .catch((err) => console.log(err));
};
const cancelPost = () => {
  window.history.back();
};

const title = document.getElementById("title");
const content = document.getElementById("content");
const userid = document.getElementById("userid");

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postID = urlParams.get("postID");

  console.log(postID);
  const URL = `http://localhost:3000/api/v1/post/show/${postID}`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        title.textContent = data.data.title;
        content.textContent = data.data.content;
        userid.textContent = data.data.user_id;
      }
    })
    .catch((err) => console.log(err));
});

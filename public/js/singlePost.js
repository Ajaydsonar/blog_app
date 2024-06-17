const config = {
  apiBaseUrl: window.location.origin, // Automatically uses the current origin
};

const title = document.getElementById("title");
const content = document.getElementById("content");
const userid = document.getElementById("userid");

document.addEventListener("DOMContentLoaded", function () {
  // const urlParams = new URLSearchParams(window.location.search);
  // const postID = urlParams.get("postID");

  const pathName = window.location.pathname;
  const pathParts = pathName.split("/");
  const postID2 = pathParts[pathParts.length - 1];

  // console.log(postID);
  const URL = `${config.apiBaseUrl}/api/v1/post/show/${postID2}`;
  fetch(URL)
    .then((res) => {
      statusCode = res.status;
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        title.textContent = data.data.title;
        content.textContent = data.data.content;
        userid.textContent = data.data.user_id;
      } else {
        console.log(data);
        // window.location.href = "http://localhost:3000/login";
        if (statusCode === 409) window.location.href = "/login";

        alert(data.message);
        title.textContent = "404 Post Not Found!";
      }
    })
    .catch((err) => console.log(err));
});

const goBack = (event) => {
  window.location.href = "/posts";
};

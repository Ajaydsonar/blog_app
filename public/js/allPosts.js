const baseURL = "http://localhost:3000/api/v1";

const postContainer = document.getElementById("post-container");

document.addEventListener("DOMContentLoaded", function () {
  function fetchPost() {
    fetch(`${baseURL}/post/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          data.data.forEach((post) => {
            const item = document.createElement("div");
            const title = document.createElement("h3");
            const content = document.createElement("p");
            const postID = document.createElement("span");
            const userID = document.createElement("span");

            title.textContent = post.title;
            content.textContent = post.content;
            postID.textContent = post.post_id;
            userID.textContent = post.user_id;

            console.log("uid :", userID, "  pid:", postID);
            item.appendChild(userID);
            item.appendChild(title);
            item.appendChild(content);
            item.appendChild(postID);
            postContainer.appendChild(item);
          });
        } else {
          window.location.href = "http://localhost:3000/register";
        }
      })
      .catch((err) => console.error("Error featching Post : ", err));
  }

  fetchPost();
});

const postContainer = document.getElementById("post-container");
const username = document.getElementById("username");

document.addEventListener("DOMContentLoaded", function () {
  const url = "http://localhost:3000/api/v1/user/active";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("check i");
        username.textContent = data.data.username;
        if (data.data.posts.length === 0)
          postContainer.textContent = "No Posts Created By you";

        data.data.posts.forEach((post) => {
          console.log("woek");
          const postDiv = document.createElement("div");
          const title = document.createElement("h3");
          const deleteBtn = document.createElement("button");
          const editBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          editBtn.textContent = "Edit";

          deleteBtn.addEventListener("click", function () {
            deletePost(post.post_id);
          });

          postDiv.id = post.post_id;
          title.textContent = post.title;

          postDiv.appendChild(title);
          postDiv.appendChild(editBtn);
          postDiv.appendChild(deleteBtn);

          postContainer.appendChild(postDiv);
        });
      } else {
        console.log(data);
      }
    });
});

const deletePost = function (parentID) {
  const deleteURL = `http://localhost:3000/api/v1/post/delete/${parentID}`;

  fetch(deleteURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const postDiv = document.getElementById(parentID);
        postDiv.remove();
      } else {
        console.log(data);
      }
    });
};

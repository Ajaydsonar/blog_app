const config = {
  apiBaseUrl: window.location.origin, // Automatically uses the current origin
};

const postContainer = document.getElementById("post-container");
const username = document.getElementById("username");

document.addEventListener("DOMContentLoaded", function () {
  const url = `${config.apiBaseUrl}/api/v1/user/active`;
  fetch(url)
    .then((res) => {
      if (res.status === 409) window.location.href = "/login";
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        username.textContent = data.data.username;
        if (data.data.posts.length === 0) {
          postContainer.textContent = "No Posts Created By You";
          postContainer.classList.add("text-center", "text-gray-500");
        }

        data.data.posts.forEach((post) => {
          const postDiv = document.createElement("div");
          const title = document.createElement("h3");
          const deleteBtn = document.createElement("button");
          const editBtn = document.createElement("button");
          deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
          editBtn.innerHTML = '<i class="fas fa-edit"></i>';

          editBtn.classList.add(
            "bg-green-500",
            "text-white",
            "py-1",
            "px-3",
            "rounded",
            "mr-2",
            "hover:bg-green-700"
          );
          deleteBtn.classList.add(
            "bg-red-500",
            "text-white",
            "py-1",
            "px-3",
            "rounded",
            "hover:bg-red-700"
          );

          editBtn.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = `/post/edit?username=${data.data.username}&postId=${post.post_id}`;
          });

          deleteBtn.addEventListener("click", function () {
            deletePost(post.post_id);
          });

          postDiv.id = post.post_id;
          title.textContent = post.title;
          postDiv.classList.add(
            "bg-white",
            "p-4",
            "shadow",
            "rounded",
            "flex",
            "justify-between",
            "items-center"
          );

          postDiv.appendChild(title);
          const buttonContainer = document.createElement("div");
          buttonContainer.appendChild(editBtn);
          buttonContainer.appendChild(deleteBtn);
          postDiv.appendChild(buttonContainer);

          postContainer.appendChild(postDiv);
        });
      } else {
        alert(data.message);
        console.log(data);
      }
    });
});

const deletePost = function (parentID) {
  const deleteURL = `${config.apiBaseUrl}/api/v1/post/delete/${parentID}`;

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

const goBack = (event) => {
  window.location.href = "/posts";
};

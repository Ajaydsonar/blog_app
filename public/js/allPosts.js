import config from "./config.js";

const baseURL = `${config.apiBaseUrl}/api/v1`;

const user = document.getElementById("user");
const createPost = document.getElementById("create-post");
let statusCode;
const postContainer = document.getElementById("post-container");

document.addEventListener("DOMContentLoaded", function () {
  function fetchPost() {
    fetch(`${baseURL}/post/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        statusCode = res.status;
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          data.data.forEach((post) => {
            // Create elements for each post
            const item = document.createElement("div");
            item.classList.add(
              "bg-white",
              "p-4",
              "rounded-lg",
              "shadow-md",
              "hover:shadow-lg",
              "transition-all",
              "duration-300",
              "ease-in-out"
            );

            const title = document.createElement("h3");
            title.classList.add(
              "text-xl",
              "font-bold",
              "text-gray-800",
              "mb-2"
            );
            title.textContent = post.title;

            const content = document.createElement("p");
            content.classList.add("text-gray-700", "mb-4");
            content.textContent = post.content;

            const userID = document.createElement("a");
            userID.classList.add("text-blue-500", "hover:underline");
            userID.textContent = `By User ID: ${post.user_id}`;
            userID.href = `/user/${post.user_id}`;

            // Append elements to the post item
            item.id = post.post_id;
            item.addEventListener("click", () => singlePost(post.post_id));
            item.appendChild(title);
            item.appendChild(content);
            item.appendChild(userID);

            // Append post item to the post container
            postContainer.appendChild(item);
          });
        } else {
          console.error(data.message);
          if (statusCode === 409) {
            window.location.href = "/login";
          }
        }
      })
      .catch((err) => console.error("Error fetching Post:", err));
  }

  fetchPost();

  function fetchUser() {
    const userURL = `${config.apiBaseUrl}/getUserDetails`;

    fetch(userURL)
      .then((res) => res.json())
      .then((data) => {
        user.textContent = data.user.username;
      })
      .catch((err) => console.error(err));
  }

  fetchUser();
});

const singlePost = (postID) => {
  const postURL = `/posts/${postID}`;
  window.location.href = postURL;
};

const viewUserDetails = (event) => {
  window.location.href = `/profile/${user.textContent}`;
};

const createNewPost = (event) => {
  window.location.href = "/create/new";
};

const baseURL = "http://localhost:3000/api/v1";
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
            const item = document.createElement("div");
            const title = document.createElement("h3");
            const content = document.createElement("p");
            const userID = document.createElement("a");

            title.textContent = post.title;
            content.textContent = post.content;
            userID.textContent = post.user_id;

            item.id = post.post_id;

            // userID.href = `/html/profile.html?userID=${post.user_id}`;
            userID.href = `/user/${post.user_id}`;

            item.addEventListener("click", () => singlePost(post.post_id));

            item.appendChild(userID);
            item.appendChild(title);
            item.appendChild(content);
            postContainer.appendChild(item);
          });
        } else {
          console.log(data.statusCode);
          alert(data.message);
          if (statusCode === 409) window.location.href = "/login";
        }
      })
      .catch((err) => console.error("Error featching Post : ", err));
  }

  fetchPost();

  function fetchUser() {
    const userURL = "http://localhost:3000/getUserDetails";

    fetch(userURL)
      .then((res) => res.json())
      .then((data) => {
        user.textContent = data.user.username;
      })
      .catch((err) => console.log(err));
  }
  fetchUser();
});

const singlePost = (postID) => {
  // const postURL = `/html/singlePost.html?postID=${postID}`;
  const postUR = `/posts/${postID}`;
  window.location.href = postUR;
};

const viewUserDetails = (event) => {
  console.log("ok");
  window.location.href = `/profile/${user.textContent}`;
};

const createNewPost = (event) => {
  window.location.href = "/create/new";
};

const title = document.getElementById("title");
const content = document.getElementById("content");

const createNewPost = () => {
  const URL = "http://localhost:3000/api/v1/post/create";

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("Post created successfully");
        // Redirect to the posts page
        window.location.href = "/posts";
      } else {
        alert(data.message);
        console.log(data);
      }
    });
};

const cancelPost = () => {
  window.history.back();
};

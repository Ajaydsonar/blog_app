const URL = "http://localhost:3000/api/v1/user/active";
const email = document.getElementById("email");
const username = document.getElementById("username");

document.addEventListener("DOMContentLoaded", function () {
  fetch(URL)
    .then((response) => {
      if (response.status === 409) window.location.href = "/login";
      return response.json();
    })
    .then((data) => {
      if (!data) {
        alert("Something Went Wrong...");
      } else {
        email.placeholder = data.email;
        username.placeholder = data.username;
      }
    });
});

const updateEmail = function () {};

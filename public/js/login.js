import config from "./config.js";

const baseURL = `${config.apiBaseUrl}/api/v1`;
const messageBox = document.getElementById("message-box");

function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${baseURL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console;
      if (data.auth) {
        messageBox.textContent = data.message;
        window.location.href = "http://localhost:3000/posts";
      } else {
        messageBox.textContent = data.message;
      }
    })
    .catch((err) => console.error("Login Failed"));
}

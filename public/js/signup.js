import config from "./config.js";

const baseURL = `${config.apiBaseUrl}/api/v1`;
function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const messageBox = document.getElementById("message-box");

  fetch(`${baseURL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        messageBox.textContent = data.message;
        window.location.href = "/login";
      } else {
        messageBox.textContent = data.message;
      }
    });
}

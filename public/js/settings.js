const config = require("./config.js");

const URL = `${config.apiBaseUrl}/api/v1/user/active-setting`;
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

const updateEmail = function (event) {
  event.preventDefault();
  const newEmail = document.getElementById("email").value;
  const data = { email: newEmail };

  const emailURL = `${config.apiBaseUrl}/api/v1/user/update/email`;
  fetch(emailURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        alert(data.message);
      } else {
        alert("Email Updated Successfully");
      }
    });
};

const updateUsername = function (event) {
  event.preventDefault();
  const newUsername = document.getElementById("username").value;
  const data = { username: newUsername };

  const updateUsernameURL = `${config.apiBaseUrl}/api/v1/user/update/username`;

  fetch(updateUsernameURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        alert(data.message);
      } else {
        alert("Username Updated Successfully");
      }
    });
};

const changePassword = function (event) {
  event.preventDefault();
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;

  const changePasswordURL = `${config.apiBaseUrl}/api/v1/user/update/password`;

  fetch(changePasswordURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, password: newPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        alert(data.message);
      } else {
        alert("Password Updated Successfully");
      }
    });
};

const logout = function (event) {
  event.preventDefault();

  const logoutURL = `${config.apiBaseUrl}/api/v1/user/logout`;
  fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  window.location.href = "/login";
};

const goBack = (event) => {
  window.location.href = "/posts";
};

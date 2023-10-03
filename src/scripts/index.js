"use strict";
// let currentEmail = "";
// Create a mock database of user credentials
const userDatabase = {
  "nickosgrigo@gmail.com": {
    email: "nickosgrigo@gmail.com",
    password: "1111",
  },
  "user2@example.com": {
    email: "evizampeka@gmail.com",
    password: "2222",
  },
  "user3@example.com": {
    email: "user3@example.com",
    password: "password3",
  },
};

const emailInput = document.querySelector("#user_email");
const passwordInput = document.querySelector("#user_password");
const form = document.querySelector(".form");
const terms = document.querySelector("#terms");

const alertMessageEl = document.getElementById("alert");
// console.log(alertMessageEl);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let emailInputValue = emailInput.value;
  let passwordInputValue = passwordInput.value;

  // Check the user's credentials against the mock database
  if (
    userDatabase[emailInputValue] &&
    userDatabase[emailInputValue].password === passwordInputValue &&
    terms.checked
  ) {
    // If the credentials are correct, redirect to the main page or give access to protected content
    let currentEmail = emailInputValue;

    localStorage.setItem("currentEmail", currentEmail);

    // window.location = "app.html";
    // Redirect to app.html
    window.location.href = "app.html";

    // Clear input fields
    emailInput.value = passwordInput.value = "";
  } else {
    // If the credentials are incorrect, display an error message
    alertMessageEl.classList.remove("hidden");
    alertMessageEl.classList.add("animate__fadeInDown");

    setTimeout(() => {
      alertMessageEl.classList.remove("animate__fadeInDown");
      alertMessageEl.classList.add("hidden");
    }, 4000);
  }
});

// export { currentEmail };

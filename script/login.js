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
  // "user3@example.com": {
  //   email: "user3@example.com",
  //   password: "password3",
  // },
};

const emailInput = document.querySelector("#user_email");
const passwordInput = document.querySelector("#user_password");
const form = document.querySelector(".form");
const terms = document.querySelector("#terms");

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

    window.location = "app.html";
  } else {
    // If the credentials are incorrect, display an error message
    const messageEl = document.querySelector("#alert");
    messageEl.classList.add("alert-show");
    setTimeout(() => {
      messageEl.classList.remove("alert-show");
    }, 4000); // 5000 milliseconds = 5 seconds
  }

  // Clear input fields
  inputLoginUsername.value = inputLoginPin.value = "";
});

// export { currentEmail };

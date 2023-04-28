"use strict";

// Data
const account1 = {
  email: "nickosgrigo@gmail.com",
  pin: 1111,
  //   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
};

const account2 = {
  email: "evizampeka@gmail.com",
  pin: 2222,
  //   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
};

const account3 = {
  email: "pp@gmail.com",
  pin: 3333,
  //   movements: [200, -200, 340, -300, -20, 50, 400, -460],
};

const account4 = {
  email: "xxxi@gmail.com",
  pin: 4444,
  //   movements: [430, 1000, 700, 50, 90],
};

const accounts = [account1, account2, account3, account4];

const emailInput = document.querySelector("#user_email");
const passwordInput = document.querySelector("#user_password");
const form = document.querySelector(".form");
const terms = document.querySelector("#terms");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("OK");

  let emailInputValue = emailInput.value;
  let passwordInputValue = passwordInput.value;
  console.log(emailInputValue);
  console.log(passwordInputValue);

  let currentAccount = accounts.find(
    (acc) => acc.email === emailInputValue.toLocaleLowerCase().trim()
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(passwordInputValue) && terms.checked) {
    console.log("Loged IN");
    window.location = "app.html";
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
  }
});

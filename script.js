"use strict";
// import { currentAccount } from "./login.js";
// console.log(currentAccount);
// console.log("OK");
// const modal = document.querySelector(".modal");
// // const overlay = document.querySelector(".overlay");
// const btnCloseModal = document.querySelector(".close-modal");
// const btnAddNewSourceOfIncome = document.querySelector("#change_income");

// btnAddNewSourceOfIncome.addEventListener("click", function () {});

const user = {
  email: "nickosgrigo@gmail.com",
  pin: 1111,
  //   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
};

// let usern = JSON.parse(localStorage.getItem("user"));
// console.log(usern);

const monthlyBudgetInput = document.getElementById("monthly_budget");
const btnResetBudget = document.getElementById("btn_reset_plan");
let modalNewMonthPlan = document.getElementById("add_new_plan");
const monthlyBudgetSpan = document.getElementById("monthly_budget_amount");

const userEmailSpan = document.getElementById("user_email_span");

const currentMonthlyBudget = 0;

//current user-object from login page
const welcomeUser = function () {
  userEmailSpan.textContent = user.email;
};
welcomeUser();

const changeMonthlyBudgetforUser = function (user, budget) {
  //Change object to store data about his budget
  user.monthlyBudget = budget;
  console.log(user);
  //Dislpay budget in UI
  monthlyBudgetSpan.textContent = budget;
};

const hideModal = function (modal) {
  // Hide the modal
  modal = bootstrap.Modal.getInstance(modal);
  modal.hide();
};

btnResetBudget.addEventListener("click", function () {
  const budget = Number(monthlyBudgetInput.value);
  console.log(budget);

  //if input is a number then get data and remove modal
  if (budget) {
    hideModal(modalNewMonthPlan);
    changeMonthlyBudgetforUser(user, budget);
  } else {
    console.log("Display error message");
  }
});

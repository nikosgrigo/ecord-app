"use strict";
// import { currentAccount } from "./login.js";
// console.log(currentAccount);

const user = {
  email: "nickosgrigo@gmail.com",
  pin: 1111,
  budget: 700,
  income: [100, 200, 50], //400
  expenses: [-100, -200, -30, -70], //-400
  saving: 0,
};

// let usern = JSON.parse(localStorage.getItem("user"));
// console.log(usern);

const monthlyBudgetInput = document.getElementById("monthly_budget");
const btnResetBudget = document.getElementById("btn_reset_plan");
let modalNewMonthPlan = document.getElementById("add_new_plan");

//UI elements for displaying prices
const monthlyBudgetSpan = document.getElementById("monthly_budget_amount");
const userEmailSpan = document.getElementById("user_email_span");

//Get income,expenses and savings spans
const incomeSpan = document.getElementById("income_value");
const expenseSpan = document.getElementById("expenses_value");
const savingSpan = document.getElementById("savings_value");

const movementsListDiv = document.querySelector(".movements_list");

const calculateDisplayAllExpenses = function () {
  //Array expenses in user object
  const totalExpenses = user.expenses.reduce((acc, cur) => acc + cur);
  expenseSpan.textContent = totalExpenses;

  console.log(totalExpenses);
  return totalExpenses;
};

calculateDisplayAllExpenses();

const calculateDisplayAllIncomeSources = function () {
  //Array income in user object
  const totalIncome = user.income.reduce((acc, cur) => acc + cur);
  incomeSpan.textContent = totalIncome;

  console.log(totalIncome);
  return totalIncome;
};

calculateDisplayAllIncomeSources();

const calculateDisplaySavings = function () {
  //Income + Balance - Outcome
  //calculate savings
  const savings =
    calculateDisplayAllIncomeSources() +
    user.budget +
    calculateDisplayAllExpenses();

  savingSpan.textContent = savings;
};

calculateDisplaySavings();

const currentMonthlyBudget = 0;

//current user-object from login page
const welcomeUser = function () {
  userEmailSpan.textContent = user.email;
};
welcomeUser();

const resetUserObject = function (user) {
  user.income = [];
  user.expenses = [];
  user.saving = [];
};

const resetUI = function () {
  incomeSpan.textContent =
    expenseSpan.textContent =
    savingSpan.textContent =
      "0";

  //Empty list
  movementsListDiv.classList.add("empty-list");

  while (movementsListDiv.firstChild) {
    movementsListDiv.removeChild(movementsListDiv.firstChild);
  }

  const html = "<p>No recent data found!</p>";

  movementsListDiv.insertAdjacentHTML("beforeend", html);
};

const initApp = function () {
  resetUserObject(user);
  resetUI();
};

const changeMonthlyBudgetforUser = function (user, budget) {
  //Change object to store data about his budget
  user.budget = budget;
  console.log(user);
  //Dislpay budget in UI
  monthlyBudgetSpan.textContent = budget;

  //reset data and UI for a new month
  initApp();
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

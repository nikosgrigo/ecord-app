"use strict";
import { currentAccount } from "./login.js";

console.log(currentAccount); // "John Doe"
const user = Object.assign(currentAccount);
console.log(user);
// const user = {
//   email: "nickosgrigo@gmail.com",
//   pin: 1111,
//   budget: 700,
//   income: [{ amount: 100 }, { amount: 200 }], //300
//   expenses: [{ amount: -100 }, { amount: -200 }], //-300
//   saving: 0,
// };

const monthlyBudgetInput = document.getElementById("monthly_budget");

//Get modal buttons
const btnResetBudget = document.getElementById("btn_reset_plan");
const btnAddNewSourceOfIncome = document.getElementById(
  "btn_add_new_source_of_income"
);

//Get modals
const addNewIncomeModal = document.getElementById("add_income_source");
let modalNewMonthPlan = document.getElementById("add_new_plan");
const modalNewExpense = document.querySelector("#add_expense");

//UI elements for displaying prices
const monthlyBudgetSpan = document.getElementById("monthly_budget_amount");
const userEmailSpan = document.getElementById("user_email_span");

//Get income,expenses and savings spans
const incomeSpan = document.getElementById("income_value");
const expenseSpan = document.getElementById("expenses_value");
const savingSpan = document.getElementById("savings_value");

const movementsListDiv = document.querySelector(".movements_list");

//////

const DisplayBalance = function () {
  monthlyBudgetSpan.textContent = user.budget;
};

const calculateDisplayAllExpenses = function () {
  //Array expenses in user object
  const totalExpenses = user.expenses.reduce((acc, cur) => acc + cur.amount, 0);
  expenseSpan.textContent = totalExpenses;

  console.log(totalExpenses);
  return totalExpenses;
};

///////////
const calculateDisplayAllIncomeSources = function () {
  //Array income in user object
  const totalIncome = user.income.reduce((acc, cur) => acc + cur.amount, 0);
  incomeSpan.textContent = totalIncome;
  return totalIncome;
};

const calculateDisplaySavings = function () {
  //Income + Balance - Outcome
  //calculate savings
  user.saving =
    calculateDisplayAllIncomeSources() +
    user.budget +
    calculateDisplayAllExpenses();

  savingSpan.textContent = user.saving;
};

const notificationSpan = document.getElementById("notification_span");

//Check if balance is smaller than 50 and send notification to the user
const checkForSmallBalance = function () {
  user.saving < 50
    ? (notificationSpan.textContent = `📌 You will soon run out of money!`)
    : (notificationSpan.textContent = `📌 You don't have any notification!`);
};

const checkForValidExpense = function (currentExpense) {
  return user.budget > currentExpense ? true : false;
};

const currentMonthlyBudget = 0;

//current user-object from login page
const welcomeUser = function () {
  userEmailSpan.textContent = user.email;
};

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

  const html = `<i class="bi bi-binoculars-fill"></i>
  <p>No recent data found!</p>`;

  movementsListDiv.insertAdjacentHTML("beforeend", html);
};

const initApp = function () {
  resetUserObject(user);
  resetUI();
};

const changeMonthlyBudgetforUser = function (user, budget) {
  //Change object to store data about his budget
  user.budget = budget;
  // console.log(user);

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

const updateUI = function () {
  calculateDisplaySavings();
  calculateDisplayAllIncomeSources();
  calculateDisplayAllExpenses();
};

const displayNewMovementUI = function (type, movementObject) {
  const currentDate = new Date().toLocaleDateString("en-GB");
  checkForSmallBalance();
  //if is the first movement in the list then remove empty
  if (movementsListDiv.classList.contains("empty-list")) {
    movementsListDiv.innerHTML = "";
    movementsListDiv.classList.remove("empty-list");
  }

  if (type === "income") {
    const html = `<div class="movement show">
    <i class="bi bi-patch-plus-fill circle-icon"></i>
  <div class="movement_type">${movementObject.description}</div>
  <div class="price">${movementObject.amount} &euro;</div>
  <div class="movement_date">${currentDate}</div>
</div>`;
    movementsListDiv.insertAdjacentHTML("beforeend", html);
    //
  } else if (type === "expense") {
    const html = `<div class="movement show">
    <i class="bi bi-patch-minus-fill circle-icon"></i>
  <div class="movement_type">${movementObject.category}</div>
  <div class="price">${movementObject.amount} &euro;</div>
  <div class="movement_date">${currentDate}</div>
</div>`;
    console.log("ok");
    movementsListDiv.insertAdjacentHTML("beforeend", html);
  }
};

//-----------------Event Listener for modals
document.addEventListener("DOMContentLoaded", function () {
  console.log("LOADED");
  DisplayBalance();
  calculateDisplayAllExpenses();
  welcomeUser();
  calculateDisplayAllIncomeSources();
  calculateDisplaySavings();
  checkForSmallBalance();
});

btnResetBudget.addEventListener("click", function () {
  const budget = Number(monthlyBudgetInput.value);
  // console.log(budget);

  //if input is a number then get data and remove modal
  if (budget) {
    hideModal(modalNewMonthPlan);
    changeMonthlyBudgetforUser(user, budget);
  } else {
    console.log("Display error message");
  }
});

const inputAmountElement = document.querySelector("#income_input");
const textareaInputElement = document.querySelector("#income_description");

btnAddNewSourceOfIncome.addEventListener("click", function () {
  const amount = Number(inputAmountElement.value);
  // console.log(amount);
  const incomeDescription = String(textareaInputElement.value).trim();
  // console.log(incomeDescription);

  if (amount && incomeDescription !== "") {
    hideModal(addNewIncomeModal);
    const newIncomeObject = {
      amount: amount,
      description: incomeDescription,
    };

    // console.log(newIncomeObject);
    user.income.push(newIncomeObject);
    updateUI();
    displayNewMovementUI("income", newIncomeObject);
    // console.log(user.income);
  }
});

// const getSelectedValueFromDropdownList = function () {

// };
/*---------------- */

const btnAddNewExpense = document.querySelector("#btn_add_new_expense");
const inputAmountExpense = document.querySelector("#expense_amount");
const selectElement = document.querySelector("#category");

btnAddNewExpense.addEventListener("click", function () {
  const amount = Number(inputAmountExpense.value);
  const selectedCategory = selectElement.value;

  if (amount && checkForValidExpense(amount)) {
    hideModal(modalNewExpense);
    const newExpenseObject = {
      amount: -Math.abs(amount),
      category: selectedCategory,
    };

    user.expenses.push(newExpenseObject);
    updateUI();
    displayNewMovementUI("expense", newExpenseObject);
  } else {
    console.log("The amount is bigger than your balance");
  }
});

const btnLogOut = document.getElementById("logout-btn");

btnLogOut.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.setItem("user", "user");
  // set the new href attribute
  console.log("Loged Out");
  window.location = "login.html";
});

const btnDeleteAccount = document.getElementById("delete-acoount-btn");

btnDeleteAccount.addEventListener("click", function (e) {
  e.preventDefault();
  // Remove a value from localStorage
  localStorage.removeItem("user");
  setTimeout((window.location = "login.html"), 5000);
});

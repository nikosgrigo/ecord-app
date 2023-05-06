"use strict";

//HTML ELEMENTS
const monthlyBudgetInput = document.getElementById("monthly_budget");

//Get modal buttons
const btnResetBudget = document.getElementById("btn_reset_plan");
const btnAddNewSourceOfIncome = document.getElementById(
  "btn_add_new_source_of_income"
);
const btnAddNewExpense = document.querySelector("#btn_add_new_expense");

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
const inputAmountExpense = document.querySelector("#expense_amount");
const selectElement = document.querySelector("#category");
const inputAmountElement = document.querySelector("#income_input");
const textareaInputElement = document.querySelector("#income_description");

const movementsListDiv = document.querySelector(".movements_list");

const notificationSpan = document.getElementById("notification_span");

//User buttons for log out and delete account
const btnLogOut = document.getElementById("logout-btn");
const btnDeleteAccount = document.getElementById("delete-acoount-btn");

const userEmail = localStorage.getItem("currentEmail");
const storedUserData = localStorage.getItem("currentUser");

/*-------------------------------------------------------- */

class User {
  constructor(email, budget = 0, income = [], expenses = [], saving = 0) {
    this.email = email;
    this.budget = budget;
    this.income = income;
    this.expenses = expenses;
    this.saving = saving;
  }
}

const user = {};

//Check for user data on local storage
if (storedUserData !== null) {
  Object.assign(user, JSON.parse(storedUserData));
  // console.log(user);
} else {
  //There is no user on localsrtorage
  console.log("No user data found in localStorage");
  //Create a ew empty Object
  Object.assign(user, new User(userEmail));
  // console.log(user);
}

//////

const calculateDisplayAllExpenses = function () {
  //Array expenses in user object
  const totalExpenses =
    user.expenses.length !== 0
      ? user.expenses.reduce((acc, cur) => acc + cur.amount, 0)
      : 0;
  expenseSpan.textContent = totalExpenses;
  return totalExpenses;
};

///////////
const calculateDisplayAllIncomeSources = function () {
  //Array income in user object
  const totalIncome =
    user.income.length !== 0
      ? user.income.reduce((acc, cur) => acc + cur.amount, 0)
      : 0;
  incomeSpan.textContent = totalIncome;
  return totalIncome;
};

const calculateDisplaySavings = function () {
  //Income + Balance - Outcome
  //Calculate savings
  user.saving =
    calculateDisplayAllIncomeSources() +
    user.budget +
    calculateDisplayAllExpenses();

  savingSpan.textContent = user.saving;
};

//ERROR
//WHEN THE PAGES LOAD WILL DISPLAY ALL MOVEMENTS
const displayUserMovementsUI = function () {
  user.movements.forEach((movObject) => {
    const html = `<div class="movement show">
      <i class="bi bi-patch-${
        movObject.type === "income" ? "plus-fill" : "minus-fill"
      } circle-icon"></i>
    <div class="movement_type">${movObject.type}</div>
    <div class="price">${movObject.amount} &euro;</div>
    <div class="movement_date">${movObject.date}</div>
  </div>`;
    movementsListDiv.insertAdjacentHTML("beforeend", html);
    console.log("ok");
  });
};

document.addEventListener("DOMContentLoaded", function () {
  console.log("LOADED");
  userEmailSpan.textContent = user.email; //Welcome user
  monthlyBudgetSpan.textContent = user.budget; //Display user monthly budget

  calculateDisplayAllExpenses();
  calculateDisplayAllIncomeSources();
  calculateDisplaySavings();
  displayUserMovementsUI();
});

const resetUserObject = function () {
  user.income = [];
  user.expenses = [];
  user.saving = [];
};

const changeMonthlyBudgetforUser = function (newBudget) {
  //Change object to store data about his budget
  user.budget = newBudget;
  // console.log(user);

  //Dislpay budget in UI
  monthlyBudgetSpan.textContent = newBudget;

  //reset data and UI for a new month
  resetUserObject();

  incomeSpan.textContent = expenseSpan.textContent = "0";
  calculateDisplaySavings();

  //Empty list
  movementsListDiv.classList.add("empty-list");

  while (movementsListDiv.firstChild) {
    movementsListDiv.removeChild(movementsListDiv.firstChild);
  }

  const html = `<i class="bi bi-binoculars-fill"></i>
    <p>No recent data found!</p>`;

  movementsListDiv.insertAdjacentHTML("beforeend", html);
};

//Check if balance is smaller than 50 and send notification to the user
const checkForSmallBalance = function () {
  user.saving < 50
    ? (notificationSpan.textContent = `📌 You will soon run out of money!`)
    : (notificationSpan.textContent = `📌 You don't have any notification!`);
};

const checkForValidExpense = function (currentExpense) {
  return user.saving - 50 > currentExpense ? true : false;
};

const hideModal = function (modal) {
  // Hide the modal
  modal = bootstrap.Modal.getInstance(modal);
  modal.hide();
};

user.movements = [];

const addDisplayNewMovementUI = function (movementObject) {
  const currentDate = new Date().toLocaleDateString("en-GB");
  movementObject.date = currentDate;

  user.movements.push(movementObject);
  console.log(user);

  //if is the first movement in the list then remove empty
  if (movementsListDiv.classList.contains("empty-list")) {
    movementsListDiv.innerHTML = "";
    movementsListDiv.classList.remove("empty-list");
  }

  if (movementObject.type === "income") {
    //Add new income source on user object income source array
    user.income.push(movementObject);

    const html = `<div class="movement show">
    <i class="bi bi-patch-plus-fill circle-icon"></i>
  <div class="movement_type">${movementObject.category}</div>
  <div class="price">${movementObject.amount} &euro;</div>
  <div class="movement_date">${currentDate}</div>
</div>`;
    movementsListDiv.insertAdjacentHTML("beforeend", html);

    //
  } else if (movementObject.type === "expense") {
    //Add new expense on user object expense array
    user.expenses.push(movementObject);

    const html = `<div class="movement show">
    <i class="bi bi-patch-minus-fill circle-icon"></i>
  <div class="movement_type">${movementObject.category}</div>
  <div class="price">${movementObject.amount} &euro;</div>
  <div class="movement_date">${currentDate}</div>
</div>`;

    movementsListDiv.insertAdjacentHTML("beforeend", html);
  }

  calculateDisplayAllExpenses();
  calculateDisplayAllIncomeSources();
  calculateDisplaySavings();
};

const saveUserDataOnLocalStorage = function () {
  localStorage.setItem("currentUser", JSON.stringify(user));
  // console.log("SAVED DATA");
  // console.log(user);
};

setInterval(saveUserDataOnLocalStorage, 4000);

//-----------------Event Listener for modals--------------

btnResetBudget.addEventListener("click", function () {
  const budget = Number(monthlyBudgetInput.value);
  // console.log(budget);
  // user.budget = budget;

  //if input is a number then get data and remove modal
  if (budget > 10) {
    hideModal(modalNewMonthPlan);
    changeMonthlyBudgetforUser(budget);
  } else {
    console.log("Display error message");
  }
});

btnAddNewSourceOfIncome.addEventListener("click", function () {
  const amount = Number(inputAmountElement.value);
  // console.log(amount);
  const incomeDescription = String(textareaInputElement.value).trim();
  // console.log(incomeDescription);

  if (amount && incomeDescription !== "") {
    hideModal(addNewIncomeModal);
    const newIncomeObject = {
      type: "income",
      amount: amount,
      category: incomeDescription,
    };

    // updateUIForNewMovement();
    addDisplayNewMovementUI(newIncomeObject);
    // console.log(user.income);
  }
});

/*---------------- */

btnAddNewExpense.addEventListener("click", function () {
  const amount = Number(inputAmountExpense.value);
  const selectedCategory = selectElement.value;

  if (amount && checkForValidExpense(amount)) {
    hideModal(modalNewExpense);
    const newExpenseObject = {
      type: "expense",
      amount: -Math.abs(amount),
      category: selectedCategory,
    };

    addDisplayNewMovementUI(newExpenseObject);
  } else {
    notificationSpan.textContent = `📌 You don't have enough money !`;

    setTimeout(
      (notificationSpan.textContent = `📌 You don't have any notification!`),
      4000
    );
    hideModal(modalNewExpense);
  }
});

btnLogOut.addEventListener("click", function (e) {
  e.preventDefault();
  // localStorage.setItem("user", "user");
  // set the new href attribute
  console.log("Loged Out");
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location = "login.html";
});

btnDeleteAccount.addEventListener("click", function (e) {
  e.preventDefault();
  // Remove a value from localStorage
  localStorage.removeItem("currentUser");
  setTimeout((window.location = "login.html"), 5000);
});

//ERROR DISPLAYING MOVEMENT LIST

//ADD THIS TO DOMCONTENTLOAD INIT APP

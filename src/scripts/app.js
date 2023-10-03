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

const notificationSpan = document.querySelector(".notification_span");

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
} else {
  //There is no user on localsrtorage
  // console.log("No user data found in localStorage");
  //Create a ew empty Object
  Object.assign(user, new User(userEmail));
}

const calculateDisplayAllExpenses = function () {
  //Array expenses in user object
  const totalExpenses =
    user.expenses.length !== 0
      ? user.expenses.reduce((acc, cur) => acc + cur.amount, 0)
      : 0;
  expenseSpan.textContent = totalExpenses;
  return totalExpenses;
};

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
  //Calculate savings
  user.saving =
    calculateDisplayAllIncomeSources() +
    user.budget +
    calculateDisplayAllExpenses();

  savingSpan.textContent = user.saving;
};

const updateUI = function () {
  calculateDisplayAllExpenses();
  calculateDisplayAllIncomeSources();
  calculateDisplaySavings();
};

//WHEN THE PAGES LOAD WILL DISPLAY ALL MOVEMENTS
const displayUserMovementsUI = function () {
  movementsListDiv.classList.remove("empty-list");

  while (movementsListDiv.firstChild) {
    movementsListDiv.removeChild(movementsListDiv.firstChild);
  }

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
  });
};

const resetMovementListUI = function () {
  if (!checkForEmptyList()) {
    //Reset movement list UI and delete all past movements
    movementsListDiv.classList.add("empty-list");

    while (movementsListDiv.firstChild) {
      movementsListDiv.removeChild(movementsListDiv.firstChild);
    }

    const html = `<i class="bi bi-binoculars-fill"></i>
 <p>No recent data found!</p>`;

    movementsListDiv.insertAdjacentHTML("beforeend", html);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  userEmailSpan.textContent = user.email; //Welcome user
  monthlyBudgetSpan.textContent = user.budget; //Display user monthly budget
  notificationSpan.textContent = `📌 You don't have any notification wet!`;

  if (user.movements !== 0 && "movements" in user) {
    //THERE ARE MOVEMENTS ON THE OBJECT SO DISPLAY THEM
    displayUserMovementsUI();
  } else {
    //THE MOVEMENT LIST IS EMPTY SO DISPLAY EMPTY LIST TEXT
    resetMovementListUI();
  }

  updateUI();
});

const resetUserObject = function () {
  user.income = [];
  user.expenses = [];
  calculateDisplaySavings();
  user.movements = [];
};

const changeMonthlyBudgetforUser = function (newBudget) {
  //Change object to store data about his budget
  user.budget = newBudget;

  //Dislpay budget in UI
  monthlyBudgetSpan.textContent = newBudget;

  //reset data and UI for a new month
  incomeSpan.textContent = expenseSpan.textContent = "0";
  resetUserObject();
  resetMovementListUI();
};

//Check if balance is smaller than 50 and send notification to the user
const checkForSmallBalance = function () {
  user.saving < 50
    ? (notificationSpan.textContent = `📌 You will soon run out of money!`)
    : (notificationSpan.textContent = `📌 You don't have any notification!`);
};

const checkForValidExpense = function (currentExpense) {
  if (user.saving - 50 > 0 && user.saving - 50 >= currentExpense) {
    return true;
  }
  return false;
};

const hideModal = function (modal) {
  // Hide the modal
  modal = bootstrap.Modal.getInstance(modal);
  modal.hide();
};

const addDisplayNewMovementUI = function (movementObject) {
  const currentDate = new Date().toLocaleDateString("en-GB");
  movementObject.date = currentDate;

  user.movements.push(movementObject);
  // console.log(user);

  if (checkForEmptyList()) {
    //Reset movement list UI and delete all past movements
    movementsListDiv.classList.remove("empty-list");

    //If list is empty so is the first item on the list clean it
    while (movementsListDiv.firstChild) {
      movementsListDiv.removeChild(movementsListDiv.firstChild);
    }
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

  updateUI();
};

const saveUserDataOnLocalStorage = function () {
  localStorage.setItem("currentUser", JSON.stringify(user));
  // console.log("SAVED DATA");
  // console.log(user);
};

setInterval(saveUserDataOnLocalStorage, 4000);

//-----------------Event Listener for modals--------------
const alertMessageEl = document.querySelectorAll(".invalid_feedback");
const textMessageList = document.querySelectorAll(".message_text");

const displayInvalidInputMessage = (curMessage, index) => {
  // Check if the collection contains at least one element
  if (alertMessageEl.length > 0) {
    // Access the first element using index 0
    const messageChangingElement = alertMessageEl[index];
    const textMessageChanging = textMessageList[index];

    // Modify the content of the element
    textMessageChanging.textContent = curMessage;

    messageChangingElement.classList.add("show");

    setTimeout(() => {
      messageChangingElement.classList.remove("show");
    }, 5000);
  }
};

btnResetBudget.addEventListener("click", function () {
  const newBudget = Number(monthlyBudgetInput.value);

  //if input is a number then get data and remove modal
  if (newBudget > 10) {
    hideModal(modalNewMonthPlan);
    changeMonthlyBudgetforUser(newBudget);
  } else {
    displayInvalidInputMessage("Empty input or invalid amount", 0);
  }
});

const checkForEmptyList = function () {
  return movementsListDiv.classList.contains("empty-list");
};

btnAddNewSourceOfIncome.addEventListener("click", function () {
  const amount = Number(inputAmountElement.value);
  const incomeDescription = String(textareaInputElement.value).trim();

  if (amount && incomeDescription !== "") {
    hideModal(addNewIncomeModal);
    const newIncomeObject = {
      type: "income",
      amount: amount,
      category: incomeDescription,
    };
    addDisplayNewMovementUI(newIncomeObject);
  } else {
    displayInvalidInputMessage("Empty input. Please Insert a valid input!", 1);
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
    checkForValidExpense(amount)
      ? displayInvalidInputMessage(
          "Empty input.Please insert a valid input!",
          2
        )
      : user.saving === 0
      ? displayInvalidInputMessage("You don't have money yet!", 2)
      : displayInvalidInputMessage("You will run out of money!", 2);
  }
});

btnLogOut.addEventListener("click", function (e) {
  e.preventDefault();

  // set the new href attribute
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "index.html";
});

btnDeleteAccount.addEventListener("click", function (e) {
  e.preventDefault();
  // Remove a value from localStorage
  localStorage.removeItem("currentUser");

  //Update UI
  updateUI();

  //Redirect user on login page
  setTimeout((window.location = "login.html"), 5000);
});

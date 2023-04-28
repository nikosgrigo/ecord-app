const form = document.querySelector(".form");
console.log(form);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("OK");
});

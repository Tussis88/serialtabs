document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    e.stopPropagation();
  }
});
const inputDom = document.querySelector("#inputString");

inputDom.focus();
inputDom.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === "Tab") {
    let inputValue = e.target.value;
    console.log(inputValue);
    e.target.value = "";
    inputDom.focus();
  }
});



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
    result = codeParser(inputValue);
    console.log(`valore: ${inputValue} || esito: ${result}`);
    e.target.value = "";
    inputDom.focus();
  }
});

function codeParser(stringCode) {
  if (stringCode.length > 3 && stringCode[2] === "." && stringCode.length < 8) return "codice Brevi";
  if (stringCode.length > 6) return "seriale";
  return "invalido";
}

// Disattiva la funzione di default del tasto tab
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    e.stopPropagation();
  }
  if (e.ctrlKey && e.key === "d") {
    e.preventDefault();
    e.stopPropagation();
  }
});

// GLOBAL VARIABLES
let currentCode;
let savedCodes = {};
let copiedSerials = [];

// DOM
// Input
const inputDom = document.querySelector("#inputString");
inputDom.focus();
inputDom.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === "Tab") {
    let result = codeParser(e.target.value);
    fillSavedCodes(result);
    tableGenerator();
    e.target.value = "";
  }
});
// Contenitore tabelle
const tableContainer = document.querySelector("#tableContainer");

// FUNZIONI
// distingue tra codice Brevi e seriali
function codeParser(input) {
  const re = /^[0-9]{2}\.[0-9]{1,4}[A-Za-z]?$/;
  if (re.test(input)) return [input, "brevi"];
  return [input, "seriale"];
}

// riempie l'oggeto SavedCodes con l'input corretto
function fillSavedCodes(data) {
  if (data[1] === "brevi") {
    currentCode = data[0];
    if (!savedCodes[currentCode]) {
      savedCodes[currentCode] = [];
    }
  } else if (data[1] === "seriale") {
    if (!savedCodes[currentCode]) {
      alert("Prima inserisci un codice Brevi");
      return;
    }
    savedCodes[currentCode].push(data[0]);
  }
}

// crea le tabelle in maniera dinamica
function tableGenerator() {
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => table.remove());

  Object.entries(savedCodes).forEach(([breviCode, serialList]) => {
    const newTable = document.createElement("table");
    if (breviCode === currentCode) newTable.classList.add("currentTable");
    tableContainer.appendChild(newTable);

    const newHead = document.createElement("tr");
    if (breviCode === currentCode) newHead.classList.add("currentCode");
    newTable.appendChild(newHead);

    const firstHead = document.createElement("th");
    firstHead.textContent = "-";
    newHead.appendChild(firstHead);

    const secondHead = document.createElement("th");
    secondHead.textContent = breviCode;
    secondHead.addEventListener("click", () => {
      currentCode = breviCode;
      tableGenerator();
    });
    newHead.appendChild(secondHead);

    const thirdHead = document.createElement("th");
    thirdHead.textContent = "-";
    newHead.appendChild(thirdHead);

    serialList.forEach((serialNumber, index) => {
      const newRow = document.createElement("tr");
      // controllo seriali doppi
      const duplicateSerial = serialList.filter(
        (serial) => serial === serialNumber,
      );
      if (duplicateSerial.length > 1) newRow.classList.add("duplicate");
      newTable.appendChild(newRow);

      const firstCell = document.createElement("td");
      firstCell.textContent = index + 1;
      newRow.appendChild(firstCell);

      const secondCell = document.createElement("td");
      secondCell.textContent = serialNumber;
      secondCell.classList.add("secondCell");
      if (copiedSerials.includes(serialNumber)) {
        secondCell.classList.add("copied");
      }
      secondCell.addEventListener("click", () => {
        navigator.clipboard.writeText(serialNumber);
        copiedSerials.push(serialNumber);
        tableGenerator();
      });
      newRow.appendChild(secondCell);

      const thirdCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "<i class='nf nf-fa-trash_can'></i>";
      deleteButton.classList.add("delete");
      deleteButton.addEventListener("click", () => {
        serialList.splice(index, 1);
        tableGenerator();
      });
      thirdCell.appendChild(deleteButton);
      newRow.appendChild(thirdCell);
    });
  });
  inputDom.focus();
}

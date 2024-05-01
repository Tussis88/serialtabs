// Disattiva la funzione di default del tasto tab
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    e.stopPropagation();
  }
});

// GLOBAL VARIABLES
let currentCode;
let savedCodes = [];
let currentCodeIndex;

// DOM
// Input
const inputDom = document.querySelector("#inputString");
inputDom.focus();
inputDom.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === "Tab") {
    let result = codeParser(e.target.value);
    fillSavedCodes(result);
    tableGenerator(result);
    console.log(`valore: ${result[0]} || esito: ${result[1]}`);
    e.target.value = "";
    inputDom.focus();
  }
});

// FUNZIONI
// crea l'oggetto che salva i seriali di un dato codice
function createSerialList(breviCode) {
  const obj = {};
  obj.breviCode = breviCode;
  obj.serials = [];
  return obj;
}

// riempie la lista di oggetti
function fillSavedCodes(data) {
  if (data[1] === "brevi") {
    if (!savedCodes.some((code) => code.breviCode === data[0])) {
      savedCodes.push(createSerialList(data[0]));
    }
    currentCodeIndex = savedCodes.findIndex(
      (code) => code.breviCode === data[0],
    );
  } else if (data[1] === "seriale") {
    savedCodes[currentCodeIndex].serials.push(data[0]);
  }
  console.table(savedCodes);
}

// distingue tra codice Brevi e seriali
function codeParser(input) {
  if (input.length > 3 && input[2] === "." && input.length < 8)
    return [input, "brevi"];
  if (input.length > 6) return [input, "seriale"];
  return [input, "invalid"];
}

// aggiunge i dati alla tabella corretta
function tableGenerator(data) {
  const tables = document.querySelectorAll("table");
  const tableContainer = document.querySelector("#tableContainer");

  if (data[1] === "brevi") {
    // gli id non possono contenere punti  e css non supporta id che iniziano con numeri
    currentCode = "c" + data[0].replace(".", "dot");
    tablesArray = [...tables];
    tableId = tablesArray.filter((table) => table.id === currentCode);
    if (tableId.length > 0) {
      console.log(tableId);
    } else {
      const newTable = document.createElement("table");
      newTable.id = currentCode;
      tableContainer.appendChild(newTable);
      const newHead = document.createElement("thead");
      newTable.appendChild(newHead);
      const newBody = document.createElement("tbody");
      newTable.appendChild(newBody);
      const newRow = document.createElement("tr");
      newHead.appendChild(newRow);

      const firstHead = document.createElement("th");
      firstHead.scope = "col";
      firstHead.textContent = "-";
      newRow.appendChild(firstHead);

      const secondHead = document.createElement("th");
      secondHead.scope = "col";
      secondHead.textContent = data[0];
      newRow.appendChild(secondHead);

      const thirdHead = document.createElement("th");
      thirdHead.scope = "col";
      thirdHead.textContent = "-";
      newRow.appendChild(thirdHead);
    }
  } else if (data[1] === "seriale") {
    const currentTable = document.querySelector(`#${currentCode}`);
    console.log(currentTable);
    if (currentTable) {
      const newRow = document.createElement("tr");
      currentTable.querySelector("tbody").appendChild(newRow);

      const firstCell = document.createElement("td");
      newRow.appendChild(firstCell);
      firstCell.textContent = firstCell.parentElement.parentElement.rows.length;

      const secondCell = document.createElement("td");
      secondCell.textContent = data[0];
      newRow.appendChild(secondCell);

      const thirdCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "x";
      deleteButton.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove();
      });
      thirdCell.appendChild(deleteButton);
      newRow.appendChild(thirdCell);
    }
  }
}

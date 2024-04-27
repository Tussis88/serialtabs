// Disattiva la funzione di default del tasto tab
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    e.stopPropagation();
  }
});

// GLOBAL VARIABLES
let currentCode;

// DOM
// Input
const inputDom = document.querySelector("#inputString");
inputDom.focus();
inputDom.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === "Tab") {
    let result = codeParser(e.target.value);
    tableGenerator(result);
    console.log(`valore: ${result[0]} || esito: ${result[1]}`);
    e.target.value = "";
    inputDom.focus();
  }
});

// FUNZIONI
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
    }
  } else if (data[1] === "seriale") {
    const currentTable = document.querySelector(`#${currentCode}`);
    console.log(currentTable);
    if (currentTable) {
      const newRow = document.createElement("tr");
      currentTable.querySelector("tbody").appendChild(newRow);
      
      const firstCell = document.createElement("td");
      firstCell.textContent = "-";
      newRow.appendChild(firstCell);

      const secondCell = document.createElement("td");
      secondCell.textContent = data[0];
      newRow.appendChild(secondCell);
    }
  }
  
}

const CODES = {
  A: 65,
  Z: 90,
};

const toChar = (_, i) => {
  return String.fromCharCode(CODES.A + i);
};

const createRow = (content, num) => {
  return `
  <div class='row'>
    <div class='row-info'>${num ? num : ""}</div>
    <div class='row-data'>${content}</div>
  </div>`;
};

const toColumn = (col) => {
  return ` 
  <div class="column">${col}</div>`;
};

const toCell = () => {
  return `
 <div class="cell" contenteditable></div>
 `;
};

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill("").map(toChar).map(toColumn).join("");

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill("").map(toCell).join("");

    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
}

const CODES = {
  A: 65,
  Z: 90,
};

const toChar = (_, i) => {
  return String.fromCharCode(CODES.A + i);
};

const createRow = (content, i) => {
  const resize = i ? "<div class='row-resize' data-resize='row'></div>" : "";
  return `
  <div class='row' data-type="resizable">
    <div class='row-info'>${i ? i : ""}
      ${resize}
    </div>
    <div class='row-data'>${content}</div>
  </div>`;
};

const toColumn = (col, i) => {
  return ` 
  <div class="column" data-type="resizable" data-col="${i}">${col}
    <div class="col-resize" data-resize='col'></div>
  </div>
  `;
};

// const toCell = (row, col) => {
//   return `
//  <div class="cell" contenteditable data-col="${col}" data-row="${row}"></div>
//   `;
// };

const toCell = (row) => {
  return function(_, col) {
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}" 
        data-row="${row}"
        data-id="${row}:${col}"
      ></div>
    `;
  };
};

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill("").map(toChar).map(toColumn).join("");

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      // .map((_, col) => toCell(row, col))
      .map(toCell(row))
      .join("");

    rows.push(createRow(cells, row + 1));
  }

  return rows.join("");
}

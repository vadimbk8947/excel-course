import { toInlineStyles } from "../../core/utils";
import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const getWidth = (state, index) => (state[index] || DEFAULT_WIDTH) + "px";
const getHeight = (state, index) => (state[index] || DEFAULT_HEIGHT) + "px";

const toChar = (_, i) => {
  return String.fromCharCode(CODES.A + i);
};

const createRow = (content, i, state = {}) => {
  const resize = i ? "<div class='row-resize' data-resize='row'></div>" : "";
  const height = getHeight(state, i);
  return `
  <div 
    class='row' 
    data-type="resizable" 
    data-row="${i}"
    style="height:${height}" 
  >
    <div class='row-info'>${i ? i : ""}
      ${resize}
    </div>
    <div class='row-data'>${content}</div>
  </div>`;
};

const toColumn = ({ col, i, width }) => {
  return ` 
  <div 
    class="column" 
    data-type="resizable" 
    data-col="${i}" 
    style="width:${width}"
  >
    ${col}
    <div class="col-resize" data-resize='col'></div>
  </div>
  `;
};

const toCell = (state, row) => {
  return (_, col) => {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}" 
        data-row="${row}"
        data-id="${id}"
        data-value="${data ?? ""}"
        style="${styles}; width:${width}"
      >${parse(data ?? "")}</div>
    `;
  };
};

const withWidthFrom = (state) => {
  return (col, i) => {
    return { col, i, width: getWidth(state.colState, i) };
  };
};

export function createTable(rowsCount = 20, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join("");

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(toCell(state, row))
      .join("");

    rows.push(createRow(cells, row + 1, state.rowState));
  }

  return rows.join("");
}

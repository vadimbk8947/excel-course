import { defaultTitle } from "../constants";
import { storage } from "../core/utils";

const toHtml = (key) => {
  const item = storage(key);
  const id = key.split(":")[1];
  return `
    <li class="db__record">
      <a href="#excel/${id}">${item.title ?? defaultTitle}</a>
      <strong>${new Date(item.openedDate).toLocaleString()}</strong>
    </li>
  `;
};

const getAllKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes("excel")) {
      continue;
    }
    keys.push(key);
  }
  return keys;
};

export const createRecordsTable = () => {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return `
    <div class="db__list-header">
      <span>Title</span>
    <span>Opening date</span>
    </div>
    <ul class="db__list">
      ${keys.map(toHtml).join("")}
    </ul>
  `;
};

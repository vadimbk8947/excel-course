import { $ } from "@core/dom";

export const resizeHandler = (e, root) => {
  const $resizer = $(e.target);
  const type = $resizer.data.resize;
  const sideProp = type === "col" ? "bottom" : "right";
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  let value;

  $resizer.css({ opacity: 1, [sideProp]: "-5000px" });

  document.onmousemove = (event) => {
    if (type === "col") {
      const delta = event.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({ right: -delta - 3 + "px" });
    } else {
      const delta = event.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({ bottom: -delta - 3 + "px" });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === "col") {
      $parent.css({ width: value + "px" });
      root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => (el.style.width = value + "px"));
    } else {
      $parent.css({ height: value + "px" });
    }

    $resizer.css({ opacity: 0, right: 0, bottom: 0 });
  };
};

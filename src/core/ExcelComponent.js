import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  // configure our component before init()
  prepare() {}

  // return component template
  toHTML() {
    return "";
  }

  // notify listeners about event
  $emit(e, ...args) {
    this.emitter.emit(e, ...args);
  }

  // subscribe to event
  $on(e, fn) {
    const unsub = this.emitter.subscribe(e, fn);
    this.unsubscribers.push(unsub);
  }

  // initializing component
  // add DOM listeners
  init() {
    this.initDomListeners();
  }

  // remove component
  // clear listeners
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}

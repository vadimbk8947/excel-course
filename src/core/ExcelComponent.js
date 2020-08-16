import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
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

  // only fields that we subscribed to come
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  $dispatch(action) {
    this.store.dispatch(action);
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

export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // notify listeners if any
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => listener(...args));
    return true;
  }

  // subscribe to notifications && add new listeners
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== fn
      );
    };
  }
}

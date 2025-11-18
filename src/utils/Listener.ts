export class Listener<EventListener> {
  private listeners: { [key: string]: EventListener } = {};

  public addListener(key: string, listener: EventListener) {
    if (this.listeners[key]) {
      return;
    }

    this.listeners[key] = listener;
  }

  public removeListener(key: string) {
    if (this.listeners[key]) {
      delete this.listeners[key];
    }
  }

  public getListener(key: string) {
    return this.listeners[key];
  }
}

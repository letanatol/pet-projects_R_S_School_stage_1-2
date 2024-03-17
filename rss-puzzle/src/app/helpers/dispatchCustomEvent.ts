export function dispatchCustomEvent(eventName: string): void {
  const customEvent = new CustomEvent(eventName, { bubbles: true });
  window.dispatchEvent(customEvent);
}

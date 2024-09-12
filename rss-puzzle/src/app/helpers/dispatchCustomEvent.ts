import { EventTypes } from './types';

export function dispatchCustomEvent(eventName: string | EventTypes): void {
  const customEvent = new CustomEvent(eventName, { bubbles: true });
  window.dispatchEvent(customEvent);
}

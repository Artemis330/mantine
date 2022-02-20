import { useEffect } from 'react';
import { getHotkeyMatcher, getHotkeyHandler } from './parse-hotkey';

export { getHotkeyHandler };

export type HokeyItem = [string, (event: KeyboardEvent) => void];

function shouldFireEvent(event: KeyboardEvent) {
  if (event.target instanceof HTMLElement) {
    return !['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName);
  }
  return true;
}

export function useHotkeys(hotkeys: HokeyItem[]) {
  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      hotkeys.forEach(([hotkey, handler]) => {
        if (getHotkeyMatcher(hotkey)(event) && shouldFireEvent(event)) {
          event.preventDefault();
          handler(event);
        }
      });
    };

    document.documentElement.addEventListener('keydown', keydownListener);
    return () => document.documentElement.removeEventListener('keydown', keydownListener);
  }, [hotkeys]);
}

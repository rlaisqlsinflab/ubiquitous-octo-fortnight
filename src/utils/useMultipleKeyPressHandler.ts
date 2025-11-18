import { useEffect, useRef } from 'react';

import { Keys } from './KeyboardEventEnum';

export const useMultipleKeyPressHandler = (
  callback: (event?: KeyboardEvent) => void,
  targetKeys: Keys[]
) => {
  const pressedKeys = useRef<Record<string, boolean>>({});

  const keyPressDownHandler = (event: KeyboardEvent) => {
    if (event.key === Keys.Meta && !event.metaKey) {
      return;
    }

    if (event.key === Keys.Control && !event.ctrlKey) {
      return;
    }

    pressedKeys.current[event.key] = true;

    const isAllKeysPressed = targetKeys.every((key) => pressedKeys.current[key]);

    if (isAllKeysPressed) {
      callback(event);
    }
  };

  const keyPressUpHandler = () => {
    pressedKeys.current = {};
  };

  const addMultipleKeyPressHandler = () => {
    window.addEventListener('keydown', keyPressDownHandler);

    window.addEventListener('keyup', keyPressUpHandler);
  };

  const removeMultipleKeyPressHandler = () => {
    window.removeEventListener('keydown', keyPressDownHandler);
    window.removeEventListener('keyup', keyPressUpHandler);
  };

  useEffect(() => {
    addMultipleKeyPressHandler();

    return () => {
      removeMultipleKeyPressHandler();
    };
  }, []);
};

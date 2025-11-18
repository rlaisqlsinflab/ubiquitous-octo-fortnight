import { useMemo } from 'react';

import type { ActionEventListener } from './type';
import { ACTION_IN_BUILDER } from '../../constants/eventName';
import { Listener } from '../../utils/Listener';

export const useActionEventManager = () => {
  const handleActionEvent = useMemo(() => new Listener<ActionEventListener>(), []);

  const addActionEvent = (eventListener: ActionEventListener, key?: string) => {
    try {
      const k = key || 'index';

      if (handleActionEvent.getListener(k)) {
        return;
      }

      handleActionEvent.addListener(k, eventListener);
      document.addEventListener(ACTION_IN_BUILDER, handleActionEvent.getListener(k));
    } catch (error) {
      // NOTE: node 환경에서 실행하는 경우 document가 없어서 에러가 발생합니다. 그럴 땐 그냥 무시할 수 있도록 합니다.
    }
  };

  const removeActionEvent = (key?: string) => {
    const k = key || 'index';

    if (handleActionEvent.getListener(k)) {
      document.removeEventListener(ACTION_IN_BUILDER, handleActionEvent.getListener(k));
      handleActionEvent.removeListener(k);
    }
  };

  return {
    addActionEvent,
    removeActionEvent,
  };
};

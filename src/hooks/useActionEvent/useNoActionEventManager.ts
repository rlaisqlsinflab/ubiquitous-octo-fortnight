import { useMemo } from 'react';

import type { NoActionEventListener } from './type';
import { NO_ACTION_IN_BUILDER_WITH_KEY } from '../../constants/eventName';
import { Listener } from '../../utils/Listener';

export const useNoActionEventManager = (props: { eventKey: string }) => {
  const handleNoActionEvent = useMemo(() => new Listener<NoActionEventListener>(), []);

  const addNoActionEvent = (eventListener: NoActionEventListener, key?: string) => {
    try {
      const k = key || 'index';

      if (handleNoActionEvent.getListener(k)) {
        return;
      }

      handleNoActionEvent.addListener(k, eventListener);
      document.addEventListener(
        NO_ACTION_IN_BUILDER_WITH_KEY(props.eventKey),
        handleNoActionEvent.getListener(k)
      );
    } catch (error) {
      // NOTE: node 환경에서 실행하는 경우 document가 없어서 에러가 발생합니다. 그럴 땐 그냥 무시할 수 있도록 합니다.
    }
  };

  const removeNoActionEvent = (key?: string) => {
    const k = key || 'index';

    if (handleNoActionEvent.getListener(k)) {
      document.removeEventListener(
        NO_ACTION_IN_BUILDER_WITH_KEY(props.eventKey),
        handleNoActionEvent.getListener(k)
      );
      handleNoActionEvent.removeListener(k);
    }
  };

  return {
    addNoActionEvent,
    removeNoActionEvent,
  };
};

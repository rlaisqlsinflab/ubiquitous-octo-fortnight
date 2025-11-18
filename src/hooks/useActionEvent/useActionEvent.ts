import { useEffect, useMemo } from 'react';

import { IntervalTimer } from './IntervalTimer';
import { useActionEventManager } from './useActionEventManager';
import { useNoActionEventManager } from './useNoActionEventManager';
import { NO_ACTION_IN_BUILDER_WITH_KEY } from '../../constants/eventName';

type AttachEventOptions = {
  noActionInterval?: number;
  step?: number;
  alarmOnceAfterTouch?: boolean;
  removeEventListenerWhenUnmount?: boolean;
  noActionEventKey?: string;
};

/**
 *
 * @param {} options
 * @param {number} options.step interval 확인 주기
 * @param {boolean} options.alarmOnceAfterTouch 터치 후 interval 시간이 지나면 한번만 알람을 울릴지 여부. false라면 매초마다 알람을 울립니다.
 */
export const useActionEvent = ({
  step,
  noActionInterval = 3000,
  alarmOnceAfterTouch = true,
  removeEventListenerWhenUnmount = true,
  noActionEventKey = 'index',
}: AttachEventOptions = {}) => {
  const { addActionEvent, removeActionEvent } = useActionEventManager();
  const { addNoActionEvent, removeNoActionEvent } = useNoActionEventManager({
    eventKey: noActionEventKey,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const intervalTimer = useMemo(
    () => new IntervalTimer({ interval: noActionInterval, alarmOnceAfterTouch, step }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    intervalTimer.start(() => {
      document.dispatchEvent(new Event(NO_ACTION_IN_BUILDER_WITH_KEY(noActionEventKey)));
    });

    return () => {
      intervalTimer.stop();
    };
  }, [intervalTimer]);

  useEffect(() => {
    addActionEvent(() => {
      intervalTimer.touch();
    }, 'root');
  }, [addActionEvent, intervalTimer]);

  useEffect(() => {
    return () => {
      if (removeEventListenerWhenUnmount) {
        removeActionEvent();
        removeNoActionEvent();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    addNoActionEvent,
    removeNoActionEvent,

    addActionEvent,
    removeActionEvent,
  };
};

import { useEffect } from 'react';

import { useUploadAllEndEvent } from './useUploadAllEndEvent';
import { useUploadEndEvent } from './useUploadEndEvent';
import { useUploadStartEvent } from './useUploadStartEvent';
import { fireUploadAllEndEvent } from '../../utils/fireEvent';

export const useUploadEvent = (() => {
  let queueCount = 0;

  return () => {
    const { addUploadStartEvent, removeUploadStartEvent } = useUploadStartEvent();
    const { addUploadEndEvent, removeUploadEndEvent } = useUploadEndEvent();
    const { addUploadAllEndEvent, removeUploadAllEndEvent } = useUploadAllEndEvent();

    useEffect(() => {
      addUploadStartEvent(() => {
        queueCount = queueCount + 1;
      }, 'root');

      return () => {
        removeUploadStartEvent('root');
      };
    }, [addUploadStartEvent, removeUploadStartEvent]);

    useEffect(() => {
      addUploadEndEvent(() => {
        queueCount = queueCount - 1;

        if (queueCount === 0) {
          fireUploadAllEndEvent();
        }
      }, 'root');

      return () => {
        removeUploadEndEvent('root');
      };
    }, [addUploadEndEvent, removeUploadEndEvent]);

    return {
      addUploadStartEvent,
      removeUploadStartEvent,

      addUploadEndEvent,
      removeUploadEndEvent,

      addUploadAllEndEvent,
      removeUploadAllEndEvent,
    };
  };
})();

import { UPLOAD_ALL_END } from '../../constants/eventName';
import { Listener } from '../../utils/Listener';

type UploadAllEndEventListener = (event: Event) => void;

export const useUploadAllEndEvent = (() => {
  // NOTE: 싱글톤 패턴으로 구현합니다.
  const handleUploadAllEndEvent = new Listener<UploadAllEndEventListener>();

  return () => {
    const addUploadAllEndEvent = (eventListener: UploadAllEndEventListener, key?: string) => {
      try {
        const k = key || 'index';

        if (handleUploadAllEndEvent.getListener(k)) {
          return;
        }

        handleUploadAllEndEvent.addListener(k, eventListener);
        document.addEventListener(UPLOAD_ALL_END, handleUploadAllEndEvent.getListener(k));
      } catch (error) {
        // NOTE: node 환경에서 실행하는 경우 document가 없어서 에러가 발생합니다. 그럴 땐 그냥 무시할 수 있도록 합니다.
      }
    };

    const removeUploadAllEndEvent = (key?: string) => {
      const k = key || 'index';

      if (handleUploadAllEndEvent.getListener(k)) {
        document.removeEventListener(UPLOAD_ALL_END, handleUploadAllEndEvent.getListener(k));
        handleUploadAllEndEvent.removeListener(k);
      }
    };

    return {
      addUploadAllEndEvent,
      removeUploadAllEndEvent,
    };
  };
})();

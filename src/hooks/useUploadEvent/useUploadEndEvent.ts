import { UPLOAD_END } from '../../constants/eventName';
import { Listener } from '../../utils/Listener';

type UploadEndEventListener = (event: Event) => void;

export const useUploadEndEvent = (() => {
  // NOTE: 싱글톤 패턴으로 구현합니다.
  const handleUploadEndEvent = new Listener<UploadEndEventListener>();

  return () => {
    const addUploadEndEvent = (eventListener: UploadEndEventListener, key?: string) => {
      try {
        const k = key || 'index';

        if (handleUploadEndEvent.getListener(k)) {
          return;
        }

        handleUploadEndEvent.addListener(k, eventListener);
        document.addEventListener(UPLOAD_END, handleUploadEndEvent.getListener(k));
      } catch (error) {
        // NOTE: node 환경에서 실행하는 경우 document가 없어서 에러가 발생합니다. 그럴 땐 그냥 무시할 수 있도록 합니다.
      }
    };

    const removeUploadEndEvent = (key?: string) => {
      const k = key || 'index';

      if (handleUploadEndEvent.getListener(k)) {
        document.removeEventListener(UPLOAD_END, handleUploadEndEvent.getListener(k));
        handleUploadEndEvent.removeListener(k);
      }
    };

    return {
      addUploadEndEvent,
      removeUploadEndEvent,
    };
  };
})();

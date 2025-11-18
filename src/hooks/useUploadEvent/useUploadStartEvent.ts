import { UPLOAD_START } from '../../constants/eventName';
import { Listener } from '../../utils/Listener';

type UploadStartEvent = CustomEvent<{ file: File }>;
type UploadStartEventListener = (event: UploadStartEvent) => void;

export const useUploadStartEvent = (() => {
  // NOTE: 싱글톤 패턴으로 구현합니다.
  const handleUploadStartEvent = new Listener<UploadStartEventListener>();

  return () => {
    const addUploadStartEvent = (eventListener: UploadStartEventListener, key?: string) => {
      try {
        const k = key || 'index';

        if (handleUploadStartEvent.getListener(k)) {
          return;
        }

        handleUploadStartEvent.addListener(k, eventListener);
        document.addEventListener(
          UPLOAD_START,
          handleUploadStartEvent.getListener(k) as EventListener
        );
      } catch (error) {
        // NOTE: node 환경에서 실행하는 경우 document가 없어서 에러가 발생합니다. 그럴 땐 그냥 무시할 수 있도록 합니다.
      }
    };

    const removeUploadStartEvent = (key?: string) => {
      const k = key || 'index';

      if (handleUploadStartEvent.getListener(k)) {
        document.removeEventListener(
          UPLOAD_START,
          handleUploadStartEvent.getListener(k) as EventListener
        );
        handleUploadStartEvent.removeListener(k);
      }
    };

    return {
      addUploadStartEvent,
      removeUploadStartEvent,
    };
  };
})();

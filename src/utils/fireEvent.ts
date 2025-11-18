import {
  ACTION_IN_BUILDER,
  UPLOAD_ALL_END,
  UPLOAD_END,
  UPLOAD_START,
} from '../constants/eventName';

/**
 * 액션 이벤트를 발생시킵니다.
 * @param {} options
 * @param {string} options.name 이벤트를 발생시킨 액션의 이름 (기본값: 'ACTION')
 */
export const fireActionEvent = ({ name = 'ACTION' }: { name?: string } = {}) => {
  const event = new CustomEvent(ACTION_IN_BUILDER, { detail: { name } });

  document.dispatchEvent(event);
};

/**
 * 업로드 시작 이벤트를 발생시킵니다.
 */
export const fireUploadStartEvent = (file: File) => {
  const event = new CustomEvent(UPLOAD_START, { detail: { file } });

  document.dispatchEvent(event);
};

/**
 * 업로드 종료 이벤트를 발생시킵니다.
 */
export const fireUploadEndEvent = () => {
  const event = new CustomEvent(UPLOAD_END);

  document.dispatchEvent(event);
};

export const fireUploadAllEndEvent = () => {
  const event = new CustomEvent(UPLOAD_ALL_END);

  document.dispatchEvent(event);
};

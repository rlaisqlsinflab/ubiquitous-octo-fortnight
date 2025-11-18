/** 빌더 내부에서 액션이 발생했을 때 울리는 이벤트 이름 */
export const ACTION_IN_BUILDER = 'actionInBuilder';

/** 빌더 내부에서 액션이 발생하지 않았을 때 울리는 이벤트 이름 */
export const NO_ACTION_IN_BUILDER = 'noActionInBuilder';

/** 빌더 요소에서 업로드가 발생했을 때 울리는 이벤트 이름 */
export const UPLOAD_START = 'uploadStart';

/** 빌더 요소에서 업로드가 종료되었을 때 울리는 이벤트 이름 */
export const UPLOAD_END = 'uploadEnd';

/** 모든 빌더 요소의 업로드가 종료되었을 때 울리는 이벤트 이름 */
export const UPLOAD_ALL_END = 'uploadAllEnd';

export const NO_ACTION_IN_BUILDER_WITH_KEY = (key: string) => `${NO_ACTION_IN_BUILDER}-${key}`;

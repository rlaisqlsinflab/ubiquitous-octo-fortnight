/**
 * 유효한 동영상 타입인지 확인합니다.
 * @param {string} videoType 동영상 타입
 * @param {string[]} validVideoTypes 유효한 동영상 타입 목록
 * @returns {boolean} videoType이 validVideoTypes에 포함되어 있으면 true, 아니면 false
 */
export const isValidVideoType = (videoType: string, validVideoTypes: string[]) => {
  const smallVideoType = videoType.toLowerCase();

  return !!validVideoTypes.find(
    (validVideoType) => smallVideoType.indexOf(validVideoType.toLowerCase()) > -1
  );
};

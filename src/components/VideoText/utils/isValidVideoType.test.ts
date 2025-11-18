import { isValidVideoType } from './isValidVideoType';
import { VALID_VIDEO_EXTENSIONS } from '../constants';

describe('isValidVideoType', () => {
  it.each(['video/mp4', 'video/m4v', 'video/quicktime', 'video/mov'])(
    '유효한 비디오 타입을 전달하면 true를 반환합니다.',
    (fileType) => {
      expect(isValidVideoType(fileType, VALID_VIDEO_EXTENSIONS)).toBe(true);
    }
  );

  it.each(['video/avi', 'video/ogg', 'video/webm'])(
    '유효하지 않은 비디오 타입을 전달하면 false를 반환합니다.',
    (fileType) => {
      expect(isValidVideoType(fileType, VALID_VIDEO_EXTENSIONS)).toBe(false);
    }
  );
});

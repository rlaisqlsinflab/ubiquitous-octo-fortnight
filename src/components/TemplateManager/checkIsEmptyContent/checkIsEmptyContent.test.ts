import { checkIsEmptyContent } from './checkIsEmptyContent';
import { testFixtures } from './testFixtures';

describe('checkIsEmptyContent', () => {
  it('content가 비어있으면 true를 반환한다.', () => {
    expect(checkIsEmptyContent(testFixtures.EMPTY_CONTENT)).toBe(true);
  });

  it('content가 비어있지 않으면 false를 반환한다.', () => {
    expect(checkIsEmptyContent(testFixtures.ONE_TEXT)).toBe(false);
    expect(checkIsEmptyContent(testFixtures.ONE_INFO_BOX)).toBe(false);
    expect(checkIsEmptyContent(testFixtures.ONE_IMAGE)).toBe(false);
    expect(checkIsEmptyContent(testFixtures.ONE_VIDEO)).toBe(false);
    expect(checkIsEmptyContent(testFixtures.TWO_BLOCK)).toBe(false);
    expect(checkIsEmptyContent(testFixtures.THREE_BLOCK)).toBe(false);
  });
});

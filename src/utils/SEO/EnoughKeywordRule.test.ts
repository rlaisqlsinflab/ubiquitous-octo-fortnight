import { EnoughKeywordRule } from './EnoughKeywordRule';

describe('EnoughKeywordRule', () => {
  describe('check', () => {
    it('키워드가 1회 이상 사용됬을 경우, true를 반환한다.', () => {
      const rule = new EnoughKeywordRule([
        {
          title: KEYWORD,
          subTitle: KEYWORD,
        },
      ]);

      const result = rule.check(generateStub(KEYWORD, 1)).passed;
      expect(result).toBe(true);
    });

    it('키워드가 1회 이상 사용됬을 경우, true를 반환한다. (한글버전)', () => {
      const rule = new EnoughKeywordRule([
        {
          title: KOREAN_KEYWORD,
          subTitle: KOREAN_KEYWORD,
        },
      ]);

      const result = rule.check(generateStub(KOREAN_KEYWORD, 1)).passed;

      expect(result).toBe(true);
    });

    it('키워드가 1회 이상 사용됬을 경우, true를 반환한다. (띄워쓰기 포함 버전)', () => {
      const rule = new EnoughKeywordRule([
        {
          title: SPACE_INCLUDED_KEYWORD,
          subTitle: SPACE_INCLUDED_KEYWORD,
        },
      ]);

      const result = rule.check(generateStub(SPACE_INCLUDED_KEYWORD, 1)).passed;
      expect(result).toBe(true);
    });

    it('키워드가 사용되지 않았을 경우, false를 반환한다.', () => {
      const rule = new EnoughKeywordRule([
        {
          title: KEYWORD,
          subTitle: KEYWORD,
        },
      ]);

      const result = rule.check(generateStub(KEYWORD, 0)).passed;
      expect(result).toBe(false);
    });
  });
});

const KEYWORD = 'keyword';
const KOREAN_KEYWORD = '키워드';
const SPACE_INCLUDED_KEYWORD = 'java script';
const NOT_KEYWORD = 'test';

// 퍼센티지에 맞는 키워드를 포함한 HTML을 생성한다.
const generateStub = (keyword: string, keywordCount: number) => `
  <html><body><p>
    ${new Array(100 - keywordCount).fill(NOT_KEYWORD).join(' ')} 
    ${new Array(keywordCount).fill(keyword).join(' ')}
  </p></body></html>
`;

import { ImageRule } from './ImageRule';

describe('ImageRule', () => {
  it('이미지 태그가 포함된 html이 주어졌을 때 true를 반환한다.', () => {
    const rule = new ImageRule();
    const html = '<html><body><img src="image.jpg"></body></html>';
    const result = rule.check(html).passed;
    expect(result).toBe(true);
  });

  it('이미지 태그가 포함되지 않은 html이 주어졌을 때 false를 반환한다.', () => {
    const rule = new ImageRule();
    const html = '<html><body><p>이곳에는 이미지가 없습니다</p></body></html>';
    const result = rule.check(html).passed;
    expect(result).toBe(false);
  });
});

import { ImageAltTextRule } from './ImageAltTextRule';

describe('AltTextRule', () => {
  it('alt text가 기본값인 파일 이름과 같지 않으면 true를 반환한다.', () => {
    const rule = new ImageAltTextRule();
    const result = rule.check(STUB.changedImage).passed;
    expect(result).toBe(true);
  });

  it('alt text가 기본값인 파일명이 같으면 false를 반환한다.', () => {
    const rule = new ImageAltTextRule();
    const result = rule.check(STUB.noChangedImage).passed;
    expect(result).toBe(false);
  });

  it('alt text가 변경된 이미지가 50% 이상이면 true를 반환한다.', () => {
    const rule = new ImageAltTextRule();
    const result = rule.check(STUB.over50PercentAltTextChangedImage).passed;
    expect(result).toBe(true);
  });

  it('alt text가 변경된 이미지가 50% 이하이면 false를 반환한다.', () => {
    const rule = new ImageAltTextRule();
    const result = rule.check(STUB.less50PercentAltTextChangedImage).passed;
    expect(result).toBe(false);
  });
});

const STUB = {
  changedImage: `
  <html>
    <body>h
      <img src="image.jpg" alt="changed">
    </body>
  </html>
`,
  noChangedImage: `
<html>
  <body>
    <img src="image.jpg" alt="image">
  </body>
</html>
`,
  over50PercentAltTextChangedImage: `
  <html>
  <body>
    <img src="image.jpg" alt="image">
    <img src="image.jpg" alt="changed">
    <img src="image.jpg" alt="changed">
  </body>
</html>
  `,
  less50PercentAltTextChangedImage: `
  <html><body>
    <img src="image.jpg" alt="image">
    <img src="image.jpg" alt="image">
    <img src="image.jpg" alt="changed">
  </body></html>
  `,
};

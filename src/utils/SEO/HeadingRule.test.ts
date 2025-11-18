import { HeadingRule } from './HeadingRule';

describe('HeadingRule', () => {
  it('html에 h3, h4가 둘 다 있고, h3가 h4보다 먼저 있으면 true를 반환한다.', () => {
    const hasHeadingRule = new HeadingRule();

    expect(hasHeadingRule.check(STUB.hasH3AndH4).passed).toBe(true);
  });

  it('html에 h3가 없으면 false를 반환한다.', () => {
    const hasHeadingRule = new HeadingRule();

    expect(hasHeadingRule.check(STUB.hasH4).passed).toBe(false);
  });

  it('html에 h4가 없으면 false를 반환한다.', () => {
    const hasHeadingRule = new HeadingRule();

    expect(hasHeadingRule.check(STUB.hasH3).passed).toBe(false);
  });

  it('html에 h4가 먼저 있으면 false를 반환한다.', () => {
    const hasHeadingRule = new HeadingRule();

    expect(hasHeadingRule.check(STUB.H4First).passed).toBe(false);
  });
});

const STUB = {
  hasH3AndH4: `<h3>h3</h3><h4>h4</h4>`,
  hasH3: `<h3>h3</h3>`,
  hasH4: `<h4>h4</h4>`,
  H4First: `<h4>h4</h4><h3>h3</h3>`,
};

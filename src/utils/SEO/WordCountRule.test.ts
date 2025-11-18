import { WordCountRule } from './WordCountRule';

describe('WordCountRule', () => {
  it('html의 단어가 200자가 넘어가면 true를 반환한다.', () => {
    const wordCountRule = new WordCountRule();

    expect(wordCountRule.check(STUB.over200words).passed).toBe(true);
  });

  it('html의 단어가 200자가 넘어가지 않으면 false를 반환한다.', () => {
    const wordCountRule = new WordCountRule();

    expect(wordCountRule.check(STUB.less200words).passed).toBe(false);
  });
});

const STUB = {
  over200words: `<p>${new Array(200).fill('long words').join(' ')}</p>`,
  less200words: '<p>hi my name is rion</p>',
};

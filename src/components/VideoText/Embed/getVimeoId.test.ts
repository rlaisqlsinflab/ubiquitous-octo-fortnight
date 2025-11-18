import { getVimeoId } from './getVimeoId';

const vimeoId = '6701902';

describe('getVimeoId', () => {
  it.each([
    `https://vimeo.com/${vimeoId}`,
    `https://player.vimeo.com/video/${vimeoId}`,
    `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`,
    `https://vimeo.com/channels/vimeogirls/${vimeoId}`,
  ])('아이디를 찾았다면 아이디만 반환합니다.', (url) => {
    expect(getVimeoId(url)).toBe(vimeoId);
  });
});

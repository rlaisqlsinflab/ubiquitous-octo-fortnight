import { getYoutubeId } from './getYoutubeId';

const youtubeId = 'EoGMVSORHtM';

describe('getYoutubeId', () => {
  it.each([
    `https://www.youtube.com/watch?v=${youtubeId}&t=220s`,
    `https://youtu.be/${youtubeId}`,
    `https://youtu.be/${youtubeId}?t=221`,
    `https://youtu.be/${youtubeId}?t=221`,
    `https://www.youtube.com/watch?v=${youtubeId}&feature=feedrec_grec_index`,
    `https://www.youtube.com/v/${youtubeId}?fs=1&amp;hl=en_US&amp;rel=0`,
    `https://www.youtube.com/watch?v=${youtubeId}#t=0m10s`,
    `https://www.youtube.com/embed/${youtubeId}?rel=0`,
    `https://www.youtube.com/watch?v=${youtubeId}`,
    `https://youtu.be/${youtubeId}`,
    `https://www.youtube.com/shorts/${youtubeId}`,
  ])('아이디를 찾았다면 아이디만 반환합니다.', (url) => {
    expect(getYoutubeId(url)).toBe(youtubeId);
  });
});

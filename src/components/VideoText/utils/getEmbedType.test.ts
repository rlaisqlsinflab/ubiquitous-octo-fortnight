import { getEmbedType } from './getEmbedType';
import { EmbedType } from '../type';

describe('getEmbedType', () => {
  it.each([
    'https://www.youtube.com/watch?v=EoGMVSORHtM&t=220s',
    'https://youtu.be/EoGMVSORHtM',
    'https://youtu.be/EoGMVSORHtM?t=221',
    'https://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index',
    'https://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0',
    'https://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s',
    'https://www.youtube.com/embed/0zM3nApSvMg?rel=0',
    'https://www.youtube.com/watch?v=0zM3nApSvMg',
    'https://youtu.be/0zM3nApSvMg',
  ])(`youtube 링크를 입력하면 ${EmbedType.YOUTUBE}를 반환합니다.`, (url) => {
    expect(getEmbedType(url)).toBe(EmbedType.YOUTUBE);
  });

  it.each([
    'https://vimeo.com/347119375',
    'https://vimeo.com/6701902',
    'https://vimeo.com/670190233',
    'https://player.vimeo.com/video/67019023',
    'https://player.vimeo.com/video/6701902',
    'https://player.vimeo.com/video/67019022?title=0&byline=0&portrait=0',
    'https://player.vimeo.com/video/6719022?title=0&byline=0&portrait=0',
    'https://vimeo.com/channels/vimeogirls/6701902',
    'https://vimeo.com/channels/vimeogirls/67019023',
    'https://vimeo.com/channels/staffpicks/67019026',
    'https://vimeo.com/15414122',
    'https://vimeo.com/channels/vimeogirls/66882931',
  ])(`vimeo 링크를 입력하면 ${EmbedType.VIMEO}를 반환합니다.`, (url) => {
    expect(getEmbedType(url)).toBe(EmbedType.VIMEO);
  });

  it.each(['https://google.com'])('잘못된 링크를 입력하면 null을 반환합니다.', (url) => {
    expect(getEmbedType(url)).toBe(null);
  });
});

import { EmbedType } from '../type';

const checkIsYoutube = (url: string): boolean => {
  // NOTE 첫 두 케이스가 가장 많은 케이스 입니다.
  const youtubeRegExps = [
    /https?:\/\/(www.)?youtube.com\/watch.+v=.+/, // watch가 pathname으로 포함된 링크
    /https?:\/\/youtu.be\/.+/, // 공유하기 링크로, youtu.be로 시작하는 링크
    /https?:\/\/(www.)?youtube.com\/.*v\/[\w]+/, // v가 pathname으로 포함된 링크
    /https?:\/\/(www.)?youtube.com\/.*embed\/[\w]+/, // embed가 pathname으로 포함된 링크
    /https?:\/\/(www.)?youtube.com\/shorts\/.+/, // shorts가 pathname으로 포함된 링크
  ];

  if (youtubeRegExps.some((regExp) => regExp.test(url))) {
    return true;
  }

  return false;
};

const checkIsVimeo = (url: string): boolean => {
  const vimeoLinkRegExp = /https?:\/\/.*vimeo.com\/.+/;

  if (vimeoLinkRegExp.test(url)) {
    return true;
  }

  return false;
};

/*
 * url을 입력받아 임베드 타입을 반환합니다.
 */
export const getEmbedType = (url: string): EmbedType | null => {
  if (checkIsYoutube(url)) {
    return EmbedType.YOUTUBE;
  }

  if (checkIsVimeo(url)) {
    return EmbedType.VIMEO;
  }

  return null;
};

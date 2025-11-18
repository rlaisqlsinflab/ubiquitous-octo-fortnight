/**
 * 입력한 링크 값이 https, http로 시작한다면 그대로 반환하고, 아니면 https://를 붙여서 반환합니다.
 */
export const sanitizeUrl = (url: string) => {
  if (url === '') {
    return '';
  }

  const validProtocols = ['https://', 'http://'];
  const isValidUrl = validProtocols.some((protocol) => url.startsWith(protocol));

  return isValidUrl ? url : `https://${url}`;
};

export const extractValidUrl = (hrefValue: string) => {
  // URL 프로토콜로 시작하는 부분을 찾습니다
  const urlRegex = /(https?:\/\/[^"\s<>]+)/;

  // 첫 번째 매치된 URL을 반환합니다
  const match = urlRegex.exec(hrefValue);

  if (match?.[1]) {
    // HTML 엔티티를 디코딩합니다
    return match[1]
      .replace(/&quot;/g, '"')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ');
  }

  return '';
};

import { useEditor } from '@craftjs/core';

import { fetchWrapLinks } from './api';
import { extractValidUrl } from './utils';
import { BUILDER_ROOT_ID } from '../../components/Frame';
import preprocessPipe from '../../utils/HTMLPreprocessor/preprocessPipe';

// 디코딩 함수
// URL은 인코딩된 형태로 href 속성에 저장되지만, 화면에 표시되는 텍스트는 디코딩된 형태일 수 있습니다.
export const decodeHtmlEntities = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;

  return textarea.value;
};

const wrapLinkHtml = async (htmlContent: string) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const links = Array.from(doc.querySelectorAll('a[href]')).filter(
      (link) =>
        link.getAttribute('href')?.includes('inflearn.com') ||
        link.getAttribute('href')?.includes('inf.run')
    );

    // 링크 URL 추출
    const originalUrls = links.map((link) => ({
      url: extractValidUrl(link.getAttribute('href') as string),
      // redirect 시 referrer=inflearn qs 필수 전달 활성화
      set_referrer: true,
    }));

    if (originalUrls.length === 0) {
      return htmlContent;
    }

    // API 호출 - 한 번에 모든 링크 처리
    const urlMap = await fetchWrapLinks(originalUrls);
    // 링크 URL 교체
    links.forEach((link) => {
      const originalUrl = link.getAttribute('href');

      const displayText = decodeHtmlEntities(link.textContent?.trim() ?? '');

      if (originalUrl && urlMap[originalUrl]) {
        link.setAttribute('href', urlMap[originalUrl]);

        // 원본 URL과 표시 텍스트가 같은지 더 정확하게 비교
        const hasNotLinkLabel =
          displayText === originalUrl || displayText === decodeURIComponent(originalUrl);

        if (hasNotLinkLabel) {
          link.innerHTML = urlMap[originalUrl];
        }
      }
    });

    // 변환된 HTML 생성
    const wrappedContent = Array.from(doc.body.children)
      .map((node) => node.outerHTML)
      .join('')
      .replace(/<p[^>]*?><\/p>/g, '<p>&nbsp;</p>')
      .replace(/>\s+</g, '><')
      .trim();

    return wrappedContent;
  } catch (error) {
    console.error('링크 랩핑 중 오류 발생:', error);

    return htmlContent; // 오류 발생 시 원본 콘텐츠 반환
  }
};

export const useEditorData = () => {
  const { query } = useEditor();

  const generateHTML = async () => {
    const $root = document.getElementById(BUILDER_ROOT_ID);

    if ($root === null) {
      return '';
    }

    const wrappedHtml = await wrapLinkHtml($root.innerHTML);

    return preprocessPipe(wrappedHtml);
  };

  return {
    generateJson: query.serialize,
    generateHTML,
  };
};

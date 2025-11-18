import sanitizeHtml from 'sanitize-html';

/**
 * sanitize-html 필터링 옵션 팩터리 함수
 * @param {boolean} [notAllowedTags=false]
 * @param {string[]} [optionalAllowedTags=[]]
 * @return {object}
 */
const buildSanitizeFilterOption = (
  notAllowedTags = false,
  optionalAllowedTags = []
) => {
  const extendAllowedTags = notAllowedTags
    ? []
    : [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe',
        'img',
        'iframe',
        'details',
        'summary',
        'sup',
        'sub',
        'video',
        'source',
        'svg',
        'path',
        'picture',
        'input',
        'button',
      ].concat(optionalAllowedTags);

  const extendAllowedAttributes: any = {
    '*': ['*'],
    'a': ['href', 'title'],
    'img': ['src', 'alt', 'title', 'width', 'height'],
    'iframe': ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
  };
  extendAllowedAttributes['*'] = ['*'];
  extendAllowedAttributes['iframe'] = ['src', 'width', 'height', 'frameborder', 'allowfullscreen'];

  const customAllowedIframeDomains = ['inflearn.com', 'youtube.com'];

  const exclusiveFilter = (element: sanitizeHtml.IFrame) => {
    if (element.tag === 'img') {
      const hasNotAllowedImgAttribute = Object.keys(element.attribs).some((imgAttribute) => {
        const notAllowedImgAttributes = ['onerror'];

        return notAllowedImgAttributes.includes(imgAttribute);
      });

      return hasNotAllowedImgAttribute;
    }

    if (element.tag === 'input') {
      const hasNotAllowedInputAttribute = Object.keys(element.attribs).some((inputAttribute) =>
        inputAttribute.startsWith('on')
      );

      return hasNotAllowedInputAttribute;
    }

    return false;
  };

  return {
    allowedTags: extendAllowedTags,
    allowedAttributes: extendAllowedAttributes,
    allowedIframeDomains: customAllowedIframeDomains,
    disallowedTagsMode: 'recursiveEscape',
    exclusiveFilter,
  };
};

export const sanitize = (
  html: string,
  options: any = buildSanitizeFilterOption()
) => sanitizeHtml(html, options);

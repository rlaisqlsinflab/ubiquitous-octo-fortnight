import { isEmpty } from 'lodash-es';

import type { SEORule } from './SEORule';

export class HeadingRule implements SEORule {
  private static instance: HeadingRule;
  private text: string;

  constructor(text?: string) {
    this.text =
      text ??
      '구조적인 글쓰기는 검색에 더 유리해요. 제목과 부제목을 충분히 사용하여 제목 → 부제목 → 본문 순으로 작성해주세요.';

    if (HeadingRule.instance) {
      return HeadingRule.instance;
    }

    HeadingRule.instance = this;

    return HeadingRule.instance;
  }

  check(html: string) {
    const domParser = new DOMParser();

    const h3AndH4Tags = domParser.parseFromString(html, 'text/html').querySelectorAll('h3, h4');
    const isH3First = h3AndH4Tags[0]?.tagName === 'H3';

    const hasH3 = !isEmpty(domParser.parseFromString(html, 'text/html').getElementsByTagName('h3'));
    const hasH4 = !isEmpty(domParser.parseFromString(html, 'text/html').getElementsByTagName('h4'));
    const passed = hasH3 && hasH4 && isH3First;

    return {
      passed,
      description: this.text,
    };
  }
}

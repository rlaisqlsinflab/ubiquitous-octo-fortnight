import { COLOR_PALETTE } from '@inflearn/ds-react';

import type { SEORule } from './SEORule';

type Keyword = {
  title: string;
  subTitle: string;
};

type KeywordIncludeRemovedSpace = {
  title: string;
  removedSpaceTitle: string;
  subTitle: string;
  removedSpaceSubTitle: string;
};

export class EnoughKeywordRule implements SEORule {
  private keywords: Keyword[];

  constructor(keywords: Keyword[]) {
    this.keywords = keywords;
  }

  private hasKeywordInHtml = (html: string, keyword: string) => html.includes(keyword);

  private isKeywordInHTML(html: string, keyword: KeywordIncludeRemovedSpace): boolean {
    return (
      this.hasKeywordInHtml(html, keyword.title) ||
      this.hasKeywordInHtml(html, keyword.removedSpaceTitle) ||
      this.hasKeywordInHtml(html, keyword.subTitle) ||
      this.hasKeywordInHtml(html, keyword.removedSpaceSubTitle)
    );
  }

  private removeSpace(keyword: string): string {
    return keyword.replace(' ', '');
  }

  private getTargetKeywords = (keywords: Keyword[]): KeywordIncludeRemovedSpace[] =>
    keywords.map((keyword) => ({
      title: keyword.title,
      removedSpaceTitle: this.removeSpace(keyword.title),
      subTitle: keyword.subTitle,
      removedSpaceSubTitle: this.removeSpace(keyword.subTitle),
    }));

  private isAllKeywordsInHTML = (html: string, keywords: KeywordIncludeRemovedSpace[]) =>
    keywords.every((keyword) => this.isKeywordInHTML(html, keyword));

  private generateMessage(keywords: KeywordIncludeRemovedSpace[]) {
    const keywordCountText = keywords.map(({ title }) => title).join(', ');

    // @description 스타일 적용을 위해서 span + className을 사용
    return (
      <span>
        강의와 관련된 스킬태그를 이용해서 본문 내용을 작성해주시면 좋아요.&nbsp;
        <span
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          css={{ backgroundColor: COLOR_PALETTE.infgreen[0], color: COLOR_PALETTE.infgreen[8] }}>
          {keywordCountText}
        </span>
        를 1번 이상 사용하세요.
      </span>
    );
  }

  private generateEmptyKeywordMessage() {
    return '강의와 관련된 스킬태그를 이용해서 본문 내용을 작성해주시면 좋아요.';
  }

  check(html: string) {
    const targetKeywords = this.getTargetKeywords(this.keywords);
    const passed = this.isAllKeywordsInHTML(html, targetKeywords);

    if (this.keywords.length <= 0) {
      return {
        passed: false,
        description: this.generateEmptyKeywordMessage(),
      };
    }

    return {
      passed,
      description: this.generateMessage(targetKeywords),
    };
  }
}

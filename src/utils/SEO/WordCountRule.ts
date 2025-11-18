import { htmlToWordList } from './htmlToWordList';
import type { SEORule } from './SEORule';

const WORD_COUNT_LESS_LIMIT = 200;

export class WordCountRule implements SEORule {
  private static instance: WordCountRule;
  private text?: (wordCount: number) => string;

  constructor(text?: (wordCount: number) => string) {
    this.text = text;

    if (WordCountRule.instance) {
      return WordCountRule.instance;
    }

    WordCountRule.instance = this;

    return WordCountRule.instance;
  }

  private generateText(wordCount: number) {
    return `본문 내용 길이는 최소 200단어 이상 써주는 게 좋아요. 현재 총 ${wordCount}개의 단어로 작성되어 있어요.`;
  }

  check(html: string) {
    const wordList = htmlToWordList(html);

    const passed = wordList.length >= WORD_COUNT_LESS_LIMIT;

    return {
      passed,
      description: this.text ? this.text(wordList.length) : this.generateText(wordList.length),
    };
  }
}

import type { SEORule } from './SEORule';

export class ImageRule implements SEORule {
  private static instance: ImageRule;
  private text: string;

  constructor(text?: string) {
    this.text = text ?? '이미지를  추가하면 수강생의 이목을 끌 수 있어요.';

    if (ImageRule.instance) {
      return ImageRule.instance;
    }

    ImageRule.instance = this;

    return ImageRule.instance;
  }

  check(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const imgTags = doc.getElementsByTagName('img');

    const passed = imgTags.length > 0;

    return {
      passed,
      description: this.text,
    };
  }
}

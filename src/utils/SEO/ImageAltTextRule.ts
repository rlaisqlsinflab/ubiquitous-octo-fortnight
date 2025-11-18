import type { SEORule } from './SEORule';

const MIN_ALT_TEXT_CHANGED_IMAGE_PERCENTAGE = 0.5;
const fileExtensionRegex = /\.[0-9a-z]+$/i;

export class ImageAltTextRule implements SEORule {
  private text: string;
  private static instance: ImageAltTextRule;

  constructor(text?: string) {
    this.text =
      text ?? '이미지의 대체텍스트는 파일명이 아닌 이미지를 설명할 수 있는 내용이어야 해요.';

    if (ImageAltTextRule.instance) {
      return ImageAltTextRule.instance;
    }

    ImageAltTextRule.instance = this;

    return ImageAltTextRule.instance;
  }

  private isAltTextChanged(image: HTMLImageElement): boolean {
    // @description 구텐베르크에서 기본 alt값으로 파일명을 넣어주고 있기 때문에, alt text 변경의 기준을 파일명과 동일한지로 구분함.
    const decodedSrc = decodeURIComponent(image.src);
    const spitedPath = decodedSrc.split('/');
    const lastSplitedPath = spitedPath[spitedPath.length - 1];
    const lastSplitedPathWithoutQuery = lastSplitedPath.split('?')[0];
    const hasExtension = fileExtensionRegex.test(lastSplitedPathWithoutQuery);
    const lastSplitedPathWithoutExtension = lastSplitedPathWithoutQuery.replace(
      fileExtensionRegex,
      ''
    );

    if (hasExtension) {
      return !(lastSplitedPathWithoutExtension === image.alt);
    }

    return !(lastSplitedPathWithoutQuery === image.alt);
  }

  check(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images = doc.getElementsByTagName('img');

    if (images.length <= 0) {
      return {
        passed: false,
        description: this.text,
      };
    }

    const minAltTextChangedImageCount = images.length * MIN_ALT_TEXT_CHANGED_IMAGE_PERCENTAGE;
    const altTextChangedImage = [...images].filter((image) => this.isAltTextChanged(image));

    const passed = altTextChangedImage.length >= minAltTextChangedImageCount;

    // @description alt text가 변경된 이미지가 전체 이미지의 특정 비율 이상이면 true를 반환.
    return {
      passed,
      description: this.text,
    };
  }
}

import Preprocessor from './Preprocessor';

export const TRANSLATE_ATTR = '[translate="no"]';

export default class TranslatePreprocessor extends Preprocessor {
  constructor() {
    super();
    this.selector = TRANSLATE_ATTR;
  }

  private hasTranslateAttr($element: Element | null): boolean {
    return $element?.getAttribute('translate') === 'no';
  }

  private actionTranslate($element: HTMLElement): void {
    $element.setAttribute('translate', 'yes');
  }

  protected preprocessCallback($element: HTMLElement): void {
    if (!this.hasTranslateAttr($element)) {
      return;
    }

    this.actionTranslate($element);
  }
}

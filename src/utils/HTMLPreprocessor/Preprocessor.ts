export default abstract class Preprocessor {
  protected selector: string;

  constructor() {
    this.selector = '';
  }

  // NOTE: preprocessPipe에서 실행하는 함수로, 최대한 재정의 하지 않도록 하여야 함.
  exec(html: HTMLElement): HTMLElement {
    this.targetElementSelector(html, this.selector).forEach(($element) =>
      this.preprocessCallback($element)
    );

    return html;
  }

  // NOTE: 타겟 컴포넌트를 찾는 함수로, constructor에서 query를 설정하여 사용함.
  private targetElementSelector($parentElement: HTMLElement, selector: string): HTMLElement[] {
    return Array.from($parentElement.querySelectorAll<HTMLElement>(selector));
  }

  // NOTE: 타겟 컴포넌트의 어떤 값을 변경하고 제거할 지 정의하는 함수로, 각 preprocess에서 재정의하여 사용함.
  protected abstract preprocessCallback($element: HTMLElement): void;
}

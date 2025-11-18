import Preprocessor from './Preprocessor';
import {
  ACTION_MENU_WRAPPER_CLASS_NAME,
  ACTION_MENU_TAB_CLASS_NAME,
  ACTION_MENU_VIEW_MODE_CLASS_NAME,
} from '../../components/ActionMenu/ActionMenu';

export default class ActionMenuPreprocessor extends Preprocessor {
  constructor() {
    super();
    this.selector = `.${ACTION_MENU_WRAPPER_CLASS_NAME}`;
  }

  private isActionMenuTab($element: Element | null): boolean {
    return Boolean($element?.classList.contains(ACTION_MENU_TAB_CLASS_NAME));
  }

  private isActionMenuEmpty($element: HTMLElement): boolean {
    return $element.childElementCount === 1 && this.isActionMenuTab($element.firstElementChild);
  }

  private removeActionMenuTab($element: HTMLElement): void {
    $element.childNodes.forEach((node) => {
      if (this.isActionMenuTab(node as HTMLElement)) {
        node.remove();
      }
    });
  }

  protected preprocessCallback($element: HTMLElement): void {
    // NOTE: 액션 메뉴 내부에 자식의 개수가 1개일 경우 즉, 액션 메뉴 내부에 액션 메뉴 탭만 있을 경우에 액션 메뉴 자체를 제거한다.
    if (this.isActionMenuEmpty($element)) {
      $element.remove();

      return;
    }

    // NOTE: 액션 메뉴 내부에 있는 매뉴 탭을 제거합니다.
    this.removeActionMenuTab($element);

    $element.classList.add(ACTION_MENU_VIEW_MODE_CLASS_NAME);
  }
}

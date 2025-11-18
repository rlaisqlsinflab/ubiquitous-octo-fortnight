import Preprocessor from './Preprocessor';
import { ACTION_MENU_VIEW_MODE_CLASS_NAME } from '../../components/ActionMenu/ActionMenu';
import {
  LEFT_ACTION_MENU_CLASS_NAME,
  LEFT_ACTION_MENU_WRAPPER_CLASS_NAME,
} from '../../components/LeftActionMenu/LeftActionMenu';

export default class LeftActionMenuPreprocessor extends Preprocessor {
  constructor() {
    super();
    this.selector = `.${LEFT_ACTION_MENU_WRAPPER_CLASS_NAME}`;
  }

  private isActionMenuTab($element: Element | null): boolean {
    return Boolean($element?.classList.contains(LEFT_ACTION_MENU_CLASS_NAME));
  }

  private removeActionMenuTab($element: HTMLElement): void {
    $element.childNodes.forEach((node) => {
      if (this.isActionMenuTab(node as HTMLElement)) {
        node.remove();
      }
    });
  }

  protected preprocessCallback($element: HTMLElement): void {
    this.removeActionMenuTab($element);

    $element.classList.add(ACTION_MENU_VIEW_MODE_CLASS_NAME);
  }
}

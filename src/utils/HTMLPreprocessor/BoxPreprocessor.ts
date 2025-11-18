import Preprocessor from './Preprocessor';
import { ADD_ELEMENT_BOX_CLASS_NAME } from '../../components/Box/AddElementBox';

export default class BoxPreprocessor extends Preprocessor {
  constructor() {
    super();
    this.selector = `.${ADD_ELEMENT_BOX_CLASS_NAME}`;
  }

  protected preprocessCallback($element: HTMLElement): void {
    // NOTE: 요소 추가 박스를 제거한다.
    $element.remove();
  }
}

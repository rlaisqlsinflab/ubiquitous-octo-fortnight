import { isEmpty } from 'lodash-es';

import Preprocessor from './Preprocessor';
import { BOX_CLASSNAME } from '../../components/Box/constants';
import { GRID_CLASS_NAME } from '../../components/Grid';

export default class GridPreprocessor extends Preprocessor {
  constructor() {
    super();
    this.selector = `.${GRID_CLASS_NAME}`;
  }

  private isNonBoxElement = ($element: HTMLElement) =>
    isEmpty($element.querySelector(`.${BOX_CLASSNAME}`));

  protected preprocessCallback($element: HTMLElement): void {
    // NOTE: 그리드 내부 값이 박스가 없는 요소(여백, 구분선)라면 제거하지 않는다

    if (this.isNonBoxElement($element)) {
      return;
    }

    // NOTE: 그리드 내부의 박스들이 모두 비어있을 경우, 그리드 자체를 제거한다.
    const $boxElements = [...$element.querySelectorAll(`.${BOX_CLASSNAME}`)];
    const isAllBoxEmpty = !$boxElements
      .map(($boxElement) => $boxElement.hasChildNodes())
      .includes(true);

    if (isAllBoxEmpty) {
      $element.remove();
    }
  }
}

import { render } from '@testing-library/react';

import {
  TEXT_ELEMENT_CLASSNAME,
  TEXT_ELEMENT_FOCUS_MENU_CLASSNAME,
} from './EditorPreprocessHelper';
import StubBuilder from './StubBuilder';
import TextPreprocessor from './TextPreprocessor';
import { Text } from '../../components/Text/Text';

describe('TextPreprocessor', () => {
  it('html에서 비어있는 에디터를 제거한다.', () => {
    const textPreprocessor = new TextPreprocessor();
    const stubHTMLWrapper = document.createElement('div');
    stubHTMLWrapper.innerHTML = render(
      <StubBuilder>
        <Text />
      </StubBuilder>
    ).baseElement.innerHTML;

    const afterPreprocessHTML = textPreprocessor.exec(stubHTMLWrapper);

    expect(afterPreprocessHTML.querySelector(`.${TEXT_ELEMENT_CLASSNAME}`)).toBeNull();
  });

  it('html에서 에디터의 포커스 메뉴를 제거한다.', () => {
    const textPreprocessor = new TextPreprocessor();
    const stubHTMLWrapper = document.createElement('div');
    stubHTMLWrapper.innerHTML = render(
      <StubBuilder>
        <Text />
      </StubBuilder>
    ).baseElement.innerHTML;

    const afterPreprocessHTML = textPreprocessor.exec(stubHTMLWrapper);

    expect(afterPreprocessHTML.querySelector(`.${TEXT_ELEMENT_FOCUS_MENU_CLASSNAME}`)).toBeNull();
  });
});

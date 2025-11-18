import { render } from '@testing-library/react';

import StubBuilder from './StubBuilder';
import TranslatePreprocessor, { TRANSLATE_ATTR } from './TranslatePreprocessor';
import { Text } from '../../../index';

describe('TranslatePreprocessor', () => {
  it.each(testCase)('$title', ({ stub }) => {
    const preprocessor = new TranslatePreprocessor();
    const stubHTMLWrapper = document.createElement('div');
    stubHTMLWrapper.innerHTML = render(stub).baseElement.innerHTML;
    const afterProcessHTML = preprocessor.exec(stubHTMLWrapper);

    expect(afterProcessHTML.querySelectorAll(TRANSLATE_ATTR).length).toBe(0);
  });
});

const testCase = [
  {
    title: 'translate="no" 속성을 가진 모든 Element에서 translate="yes" 로 치환한다. case. 1',
    stub: (
      <StubBuilder>
        <Text />
      </StubBuilder>
    ),
  },
];

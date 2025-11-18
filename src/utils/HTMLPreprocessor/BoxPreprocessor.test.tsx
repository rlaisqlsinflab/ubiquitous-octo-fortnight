import { render } from '@testing-library/react';

import BoxPreprocessor from './BoxPreprocessor';
import StubBuilder from './StubBuilder';
import { ADD_ELEMENT_BOX_CLASS_NAME } from '../../components/Box/AddElementBox';
import OneColumnText from '../../components/Grid/OneColumnText';
import TwoColumnGrid from '../../components/Grid/TwoColumnGrid';

describe('BoxPreprocessor', () => {
  it.each(testCase)('$title', ({ stub }) => {
    const preprocessor = new BoxPreprocessor();
    const stubHTMLWrapper = document.createElement('div');
    stubHTMLWrapper.innerHTML = render(stub).baseElement.innerHTML;
    const afterProcessHTML = preprocessor.exec(stubHTMLWrapper);

    expect(afterProcessHTML.querySelectorAll(`.${ADD_ELEMENT_BOX_CLASS_NAME}`).length).toBe(0);
  });
});

const testCase = [
  {
    title: '모든 AddElementBox를 제거한다. 1',
    stub: (
      <StubBuilder>
        <OneColumnText />
      </StubBuilder>
    ),
  },
  {
    title: '모든 AddElementBox를 제거한다. 2',
    stub: (
      <StubBuilder>
        <TwoColumnGrid />
      </StubBuilder>
    ),
  },
];

import { render } from '@testing-library/react';

import BoxPreprocessor from './BoxPreprocessor';
import GridPreprocessor from './GridPreprocessor';
import StubBuilder from './StubBuilder';
import { GRID_CLASS_NAME } from '../../components/Grid';
import OneColumnText from '../../components/Grid/OneColumnText';
import Separator, { SEPARATOR_CLASS_NAME } from '../../components/Separator/Separator';

describe('GridPreprocessor', () => {
  it('Grid 안에 Box가 모두 비어있을 경우, Grid가 제거된다.', () => {
    const gridPreprocessor = new GridPreprocessor();
    const boxPreprocessor = new BoxPreprocessor();

    const stubHTMLWrapper = document.createElement('div');
    stubHTMLWrapper.innerHTML = render(
      <StubBuilder>
        <OneColumnText />
      </StubBuilder>
    ).baseElement.innerHTML;
    boxPreprocessor.exec(stubHTMLWrapper);
    const afterProcessHTML = gridPreprocessor.exec(stubHTMLWrapper);

    expect(afterProcessHTML.querySelector(`.${GRID_CLASS_NAME}`)).toBeNull();
  });

  it('Grid가 여백이나 구분선일 경우는 제거되지 않는다.', () => {
    const gridPreprocess = new GridPreprocessor();

    const stubHTMLWrapper = document.createElement('div');
    stubHTMLWrapper.innerHTML = render(
      <StubBuilder>
        <Separator />
      </StubBuilder>
    ).baseElement.innerHTML;

    const afterProcessHTML = gridPreprocess.exec(stubHTMLWrapper);

    expect(afterProcessHTML.querySelector(`.${SEPARATOR_CLASS_NAME}`)).not.toBeNull();
  });
});

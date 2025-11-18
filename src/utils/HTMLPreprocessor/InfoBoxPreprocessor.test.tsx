import { render } from '@testing-library/react';

import InfoBoxPreprocess from './InfoBoxPreprocessor';
import StubBuilder from './StubBuilder';
import { InfoBox, INFO_BOX_CLASSNAME } from '../../components/InfoBox/InfoBox';

describe('InfoBoxPreprocessor', () => {
  it('html에서 비어있는 인포박스를 제거한다.', () => {
    const stubHTMLWrapper = document.createElement('div');
    const stubHTML = render(
      <StubBuilder>
        <InfoBox />
      </StubBuilder>
    ).baseElement.innerHTML;
    stubHTMLWrapper.innerHTML = stubHTML;
    const infoboxPreprocess = new InfoBoxPreprocess();

    const afterPreprocessHTML = infoboxPreprocess.exec(stubHTMLWrapper);

    expect(afterPreprocessHTML.querySelector(`.${INFO_BOX_CLASSNAME}`)).toBeNull();
  });
});

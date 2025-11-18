import { render } from '@testing-library/react';

import ActionMenuPreprocessor from './ActionMenuPreprocessor';
import InfoBoxPreprocessor from './InfoBoxPreprocessor';
import StubBuilder from './StubBuilder';
import VideoTextPreprocess from './VideoTextPreprocessor';
import {
  ACTION_MENU_WRAPPER_CLASS_NAME,
  ACTION_MENU_TAB_CLASS_NAME,
} from '../../components/ActionMenu/ActionMenu';
import { InfoBox } from '../../components/InfoBox/InfoBox';
import { VideoText } from '../../components/VideoText/VideoText';

describe('ActionMenuPreprocessor', () => {
  it('ActionMenu의 자식이 LeftActionMenu 탭만 있을 경우, ActionMenu를 제거한다.', () => {
    const preprocessor = new ActionMenuPreprocessor();
    const boxPreprocessor = new InfoBoxPreprocessor();
    const stubHTMLWrapper = document.createElement('div');
    stubHTMLWrapper.innerHTML = render(
      <StubBuilder>
        <InfoBox />
      </StubBuilder>
    ).baseElement.innerHTML;
    const boxRemovedHTML = boxPreprocessor.exec(stubHTMLWrapper);

    const afterProcessHTML = preprocessor.exec(boxRemovedHTML);

    expect(afterProcessHTML.querySelector(`.${ACTION_MENU_WRAPPER_CLASS_NAME}`)).toBeNull();
  });

  it('ActionMenu의 ActionMenuTab을 제거한다', () => {
    const preprocessor = new ActionMenuPreprocessor();
    const videoPreprocessor = new VideoTextPreprocess();
    const stubHTMLWrapper = document.createElement('div');
    stubHTMLWrapper.innerHTML = render(
      <StubBuilder>
        <VideoText />
      </StubBuilder>
    ).baseElement.innerHTML;

    const boxRemovedHTML = videoPreprocessor.exec(stubHTMLWrapper);
    const afterProcessHTML = preprocessor.exec(boxRemovedHTML);

    expect(afterProcessHTML.querySelector(`.${ACTION_MENU_TAB_CLASS_NAME}`)).toBeNull();
  });
});

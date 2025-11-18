import { render } from '@testing-library/react';

import { TEXT_ELEMENT_CLASSNAME } from './EditorPreprocessHelper';
import StubBuilder from './StubBuilder';
import VideoTextPreprocess from './VideoTextPreprocessor';
import { VIDEO_TEXT_PLACE_HOLDER_VIEWMODE_CLASSNAME } from '../../components/VideoText/constants';
import { VideoText } from '../../components/VideoText/VideoText';

describe('VideoTextPreprocessor', () => {
  it('비디오 텍스트에서 비디오가 비어있을 경우, 대체 이미지의 view mode가 활성화되어 볼 수 있게 된다.', () => {
    const imageTextPreprocess = new VideoTextPreprocess();
    const mockHTMLWrapper = document.createElement('div');
    mockHTMLWrapper.innerHTML = render(
      <StubBuilder>
        <VideoText />
      </StubBuilder>
    ).baseElement.innerHTML;

    const afterProcessHTML = imageTextPreprocess.exec(mockHTMLWrapper);

    expect(afterProcessHTML.querySelector(`.${TEXT_ELEMENT_CLASSNAME}`)).toBeNull();
    expect(
      afterProcessHTML.querySelector(`.${VIDEO_TEXT_PLACE_HOLDER_VIEWMODE_CLASSNAME}`)
    ).not.toBeNull();
  });

  it('비디오 텍스트에서 텍스트가 비어있을 경우, 텍스트가 제거된다', () => {
    const imageTextPreprocess = new VideoTextPreprocess();
    const mockHTMLWrapper = document.createElement('div');
    mockHTMLWrapper.innerHTML = render(
      <StubBuilder>
        <VideoText uploadedVideoUrl="something" />
      </StubBuilder>
    ).baseElement.innerHTML;

    const afterProcessHTML = imageTextPreprocess.exec(mockHTMLWrapper);

    expect(afterProcessHTML.querySelector(`.${TEXT_ELEMENT_CLASSNAME}`)).toBeNull();
  });
});

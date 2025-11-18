import { render } from '@testing-library/react';

import ImageTextPreprocess from './ImageTextPreprocessor';
import StubBuilder from './StubBuilder';
import { IMAGE_TEXT_PLACE_HOLDER_VIEWMODE_CLASSNAME } from '../../components/ImageText/Dropzone/Dropzone';
import { DROP_ZONE_AREA_CLASSNAME } from '../../components/ImageText/Dropzone/DropzoneArea';
import { ImageText } from '../../components/ImageText/ImageText';

describe('ImageTextPreprocessor', () => {
  it('이미지 텍스트에서 이미지가 비어있을 경우, 대체 이미지의 view mode가 활성화 되어 볼 수 있게 된다.', () => {
    const imageTextPreprocess = new ImageTextPreprocess();
    const stubHTMLWrapper = document.createElement('div');
    stubHTMLWrapper.innerHTML = render(
      <StubBuilder>
        <ImageText content="hihi" />
      </StubBuilder>
    ).baseElement.innerHTML;

    const afterProcessHTML = imageTextPreprocess.exec(stubHTMLWrapper);

    expect(afterProcessHTML.querySelector(`.${DROP_ZONE_AREA_CLASSNAME}`)).toBeNull();
    expect(
      afterProcessHTML.querySelector(`.${IMAGE_TEXT_PLACE_HOLDER_VIEWMODE_CLASSNAME}`)
    ).not.toBeNull();
  });

  it('이미지 텍스트에서 텍스트가 비어있을 경우, 텍스트가 제거된다', () => {
    const imageTextPreprocess = new ImageTextPreprocess();
    const stubHTMLWrapper = document.createElement('div');
    stubHTMLWrapper.innerHTML = render(
      <StubBuilder>
        <ImageText content="" url="https://inflearn.com" />
      </StubBuilder>
    ).baseElement.innerHTML;

    const afterProcessHTML = imageTextPreprocess.exec(stubHTMLWrapper);

    expect(afterProcessHTML.querySelector(`.${DROP_ZONE_AREA_CLASSNAME}`)).toBeNull();
  });
});

import ActionMenuPreprocessor from './ActionMenuPreprocessor';
import BoxPreprocessor from './BoxPreprocessor';
import GridPreprocessor from './GridPreprocessor';
import ImageTextPreprocess from './ImageTextPreprocessor';
import InfoBoxPreprocess from './InfoBoxPreprocessor';
import LeftActionMenuPreprocessor from './LeftActionMenuPreprocessor';
import { SanitizePreprocessor } from './SanitizePreprocessor';
import TextPreprocessor from './TextPreprocessor';
import TranslatePreprocessor from './TranslatePreprocessor';
import VideoTextPreprocess from './VideoTextPreprocessor';

const blockPreprocessorGroup = [
  new ActionMenuPreprocessor(),
  new GridPreprocessor(),
  new LeftActionMenuPreprocessor(),
];

const normalPreprocessorGroup = [new TextPreprocessor()];

const elementPreprocessorGroup = [
  new BoxPreprocessor(),
  new InfoBoxPreprocess(),
  new ImageTextPreprocess(),
  new VideoTextPreprocess(),
];

// NOTE: element -> normalElement -> block 순서대로, 작은 개념의 요소에서 큰 범위의 요소 순서대로 실행되어야 합니다.
const preprocess = [
  new SanitizePreprocessor(),
  ...elementPreprocessorGroup,
  ...normalPreprocessorGroup,
  ...blockPreprocessorGroup,
  new TranslatePreprocessor(),
];

const preprocessPipe = (stringifyHTML: string) => {
  const htmlWrapper = document.createElement('div');
  htmlWrapper.innerHTML = stringifyHTML;
  let html: HTMLElement = htmlWrapper;

  preprocess.forEach((process) => {
    try {
      html = process.exec(html);
    } catch {
      throw Error(`${process.constructor.name} 에서 문제가 발생했습니다.`);
    }
  });

  return html.innerHTML;
};

export default preprocessPipe;

import EditorPreprocessHelper from './EditorPreprocessHelper';
import Preprocessor from './Preprocessor';
import {
  VIDEO_TEXT_CLASS_NAME,
  VIDEO_TEXT_INPUT_CLASS_NAME,
  VIDEO_TEXT_PLACE_HOLDER_CLASSNAME,
  VIDEO_TEXT_PLACE_HOLDER_VIEWMODE_CLASSNAME,
} from '../../components/VideoText/constants';
import { DROP_ZONE_VIDEO_CLASSNAME } from '../../components/VideoText/VideoDropzone';
import { VIDEO_TEXT_UPLOADED_COVER_CLASS_NAME } from '../../components/VideoText/VideoUploaded';

export default class VideoTextPreprocess extends Preprocessor {
  private editorHelper: EditorPreprocessHelper;

  constructor() {
    super();

    this.editorHelper = new EditorPreprocessHelper();
    this.selector = `.${VIDEO_TEXT_CLASS_NAME}`;
  }

  private isTextEmpty($text: HTMLElement): boolean {
    return this.editorHelper.isEditorEmpty($text);
  }

  private removeVideoInput($video: HTMLElement): void {
    const $videoInput = $video.querySelector<HTMLElement>(`.${VIDEO_TEXT_INPUT_CLASS_NAME}`);
    $videoInput?.remove();
  }

  private removeVideoTextCover($video: HTMLElement): void {
    const $videoUploadedCover = $video.querySelector<HTMLElement>(
      `.${VIDEO_TEXT_UPLOADED_COVER_CLASS_NAME}`
    );
    $videoUploadedCover?.remove();
  }

  private addControlsInVideo($video: HTMLElement): void {
    $video.setAttribute('controls', 'true');
  }

  protected preprocessCallback($element: HTMLElement): void {
    const $text = this.editorHelper.findEditor($element);
    const $dropzoneSelection = $element.querySelector<HTMLElement>(`.${DROP_ZONE_VIDEO_CLASSNAME}`);
    const $videoPlaceholder = $element.querySelector<HTMLElement>(
      `.${VIDEO_TEXT_PLACE_HOLDER_CLASSNAME}`
    );
    const $video = $element.querySelector<HTMLElement>('video');

    const textEmpty = this.isTextEmpty($element);
    const videoEmpty = $dropzoneSelection !== null;

    this.removeVideoTextCover($element);
    this.removeVideoInput($element);

    // NOTE: 비디오에 컨트롤을 추가한다.
    if ($video !== null) {
      this.addControlsInVideo($video);
    }

    // NOTE: Text가 비어있다면 해당 Text를 제거한다.
    if (textEmpty) {
      $text?.remove();
    }

    // NOTE: Selection이 존재한다면, 비디오가 올라가지 않은 것이므로, Selection을 제거한다.
    if (videoEmpty) {
      $dropzoneSelection.remove();
      $videoPlaceholder?.classList.add(VIDEO_TEXT_PLACE_HOLDER_VIEWMODE_CLASSNAME);
    }
  }
}

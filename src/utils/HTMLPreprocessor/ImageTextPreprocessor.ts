import EditorPreprocessHelper from './EditorPreprocessHelper';
import Preprocessor from './Preprocessor';
import {
  IMAGE_TEXT_PLACE_HOLDER_CLASSNAME,
  IMAGE_TEXT_PLACE_HOLDER_VIEWMODE_CLASSNAME,
} from '../../components/ImageText/Dropzone/Dropzone';
import { DROP_ZONE_AREA_CLASSNAME } from '../../components/ImageText/Dropzone/DropzoneArea';
import { MP4_REPLACEMENT_IMAGE_CLASSNAME } from '../../components/ImageText/Dropzone/DropzonePreview';
import { IMAGE_TEXT_CLASSNAME as IMAGE_TEXT_CLASS_NAME } from '../../components/ImageText/ImageText';

export default class ImageTextPreprocessor extends Preprocessor {
  private editorHelper: EditorPreprocessHelper;

  constructor() {
    super();

    this.editorHelper = new EditorPreprocessHelper();
    this.selector = `.${IMAGE_TEXT_CLASS_NAME}`;
  }

  private isTextEmpty($text: HTMLElement): boolean {
    return this.editorHelper.isEditorEmpty($text);
  }

  protected preprocessCallback($element: HTMLElement): void {
    const $image = $element.querySelector<HTMLElement>(`.${DROP_ZONE_AREA_CLASSNAME}`);
    const $editor = this.editorHelper.findEditor($element);
    const $gifImage = $element.querySelector(`img.${MP4_REPLACEMENT_IMAGE_CLASSNAME}`);

    const textEmpty = $editor && this.isTextEmpty($editor);
    const imageEmpty = $image !== null;

    // NOTE: Text가 비어있다면 해당 Text를 제거한다.
    if (textEmpty) {
      $editor.remove();
    }

    // NOTE: Dropzone이 존재한다면, 이미지가 올라가지 않은 것이므로, Dropzone을 제거한다.
    if (imageEmpty) {
      $image.remove();

      const $imagePlaceholder = $element.querySelector<HTMLElement>(
        `.${IMAGE_TEXT_PLACE_HOLDER_CLASSNAME}`
      );
      $imagePlaceholder?.classList.add(IMAGE_TEXT_PLACE_HOLDER_VIEWMODE_CLASSNAME);
    }

    if ($gifImage) {
      const src = ($gifImage as HTMLImageElement).src.replace('.gif', '.gif.mp4');

      $gifImage.outerHTML = `<video
                        autoPlay
                        loop
                        playsInline
                        muted
                        class="dropzone-preview__uploaded-content">
                            <source src=${src} type="video/mp4" />
                        </video>`;
    }
  }
}

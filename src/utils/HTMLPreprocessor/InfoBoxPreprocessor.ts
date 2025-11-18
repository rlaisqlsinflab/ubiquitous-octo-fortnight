import EditorPreprocessHelper from './EditorPreprocessHelper';
import Preprocessor from './Preprocessor';
import { INFO_BOX_CLASSNAME } from '../../components/InfoBox/InfoBox';

export default class InfoBoxPreprocessor extends Preprocessor {
  private editorHelper: EditorPreprocessHelper;

  constructor() {
    super();
    this.editorHelper = new EditorPreprocessHelper();
    this.selector = `.${INFO_BOX_CLASSNAME}`;
  }

  protected preprocessCallback($element: HTMLElement): void {
    const $tiptap = this.editorHelper.findEditor($element);

    // NOTE: 정보박스 내부의 에디터를 찾아서, 해당 에디터가 비어있을 경우 정보박스를 제거한다.
    if ($tiptap !== null && this.editorHelper.isEditorEmpty($tiptap)) {
      this.editorHelper.removeContentEditableAttribute($tiptap);
      $element.remove();
    }
  }
}

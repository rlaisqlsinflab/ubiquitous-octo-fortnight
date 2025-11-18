import EditorPreprocessHelper, { TEXT_ELEMENT_CLASSNAME } from './EditorPreprocessHelper';
import Preprocessor from './Preprocessor';
import { TEXT_VIEW_MODE_CLASSNAME } from '../../components/Text/Text';

export default class TextPreprocessor extends Preprocessor {
  protected editorHelper: EditorPreprocessHelper;
  constructor() {
    super();
    this.editorHelper = new EditorPreprocessHelper();
    this.selector = `.${TEXT_ELEMENT_CLASSNAME}`;
  }

  protected preprocessCallback($element: HTMLElement): void {
    // NOTE: 에디터의 contenteditable을 제거한다.
    this.editorHelper.removeContentEditableAttribute($element);

    // NOTE: 에디터의 메뉴를 제거한다.
    this.editorHelper.removeTextToolbar($element);

    // NOTE: 에디터 코드블록의 언어 선택 드랍다운을 제거한다.
    this.editorHelper.removeCodeLanguageSelector($element);

    // NOTE: 에디터 코드블록의 className을 제거해서, 스타일을 제거한다.
    this.editorHelper.getAllCodeElement($element)?.forEach(($codeElement) => {
      $codeElement.classList.remove('code-block__code');
    });

    // NOTE: 에디터 뷰모드 className을 추가한다.
    this.editorHelper.addClassName($element, TEXT_VIEW_MODE_CLASSNAME);

    // NOTE: 에디터 이모지 선택자가 남아있는 케이스를 배제한다.
    this.editorHelper.removeEmojiPicker($element);

    $element.innerHTML = $element.innerHTML.replaceAll('`', '\\`');

    this.editorHelper.replacePlaceholder($element);

    // NOTE: 에디터가 비어있을 경우 해당 에디터를 제거한다.
    if ($element !== null && this.editorHelper.isEditorEmpty($element)) {
      $element.remove();
    }
  }
}

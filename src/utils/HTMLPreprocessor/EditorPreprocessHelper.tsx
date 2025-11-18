export const TEXT_ELEMENT_CLASSNAME = 'editor-container';
export const TIPTAP_CLASSNAME = 'tiptap';
export const TEXT_ELEMENT_FOCUS_MENU_CLASSNAME = 'focus-menu';
export const TEXT_ELEMENT_SELECTION_MENU_CLASSNAME = 'selection-menu';

export const EMPTY_TEXT_CLASSNAME = 'is-empty';

export default class EditorPreprocessHelper {
  private isContentEmpty = ($textElement: HTMLElement): boolean => {
    if ($textElement.classList.contains(EMPTY_TEXT_CLASSNAME)) {
      return true;
    }

    return false;
  };
  isEditorEmpty($editor: HTMLElement): boolean {
    const $contents = $editor.querySelectorAll<HTMLElement>(`.${TIPTAP_CLASSNAME} > *`);

    if ($contents.length === 1 && this.isContentEmpty($contents[0])) {
      return true;
    }

    return false;
  }

  findEditor($element: HTMLElement): HTMLElement | null {
    return $element.querySelector(`.${TEXT_ELEMENT_CLASSNAME}`);
  }

  findAllEditor($element: HTMLElement): HTMLElement[] {
    return Array.from($element.querySelectorAll(`.${TEXT_ELEMENT_CLASSNAME}`));
  }

  removeContentEditableAttribute($element: HTMLElement | null): void {
    $element?.querySelectorAll(`.${TIPTAP_CLASSNAME}`)?.forEach(($tiptap) => {
      $tiptap?.removeAttribute('contenteditable');
    });
  }

  removeTextToolbar($element: HTMLElement): void {
    $element.querySelector(`.${TEXT_ELEMENT_FOCUS_MENU_CLASSNAME}`)?.remove();
    $element.querySelector(`.${TEXT_ELEMENT_SELECTION_MENU_CLASSNAME}`)?.remove();
  }

  removeCodeLanguageSelector($element: HTMLElement): void {
    $element
      .querySelectorAll('.code-block-language-select')
      .forEach(($selector) => $selector.remove());
  }

  getAllCodeElement($element: HTMLElement): Element[] | null {
    return [...$element.querySelectorAll('.code-block__code')];
  }

  removeEmojiPicker($element: HTMLElement): void {
    $element
      .querySelectorAll(
        'span[data-type="emoji"] ~ .ProseMirror-separator ~ .ProseMirror-trailingBreak'
      )
      .forEach(($emojiPicker) => {
        $emojiPicker.remove();
      });
    $element.querySelector('.ProseMirror-separator')?.remove();
  }

  addClassName($element: HTMLElement, className: string) {
    $element.classList.add(className);
  }

  replacePlaceholder($element: HTMLElement): void {
    $element.querySelectorAll('.is-empty')?.forEach(($empty) => {
      $empty.setAttribute('data-placeholder', '');
    });
  }
}

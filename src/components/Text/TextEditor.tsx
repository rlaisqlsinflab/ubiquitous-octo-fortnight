/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEditor, useNode } from '@craftjs/core';
import type {
  OnClickControlCallback,
  OnClickDropdownControlCallback,
  useTiptapEditor,
} from '@inflearn/editor';
import { Editor } from '@inflearn/editor';
import { useContext, useEffect } from 'react';

import { COLOR_CONTROL_PALETTE, HEADINGS_OPTIONS } from './editorCommonOptions';
import type { TextCommonProps } from './types';
import { ExternalHandlerContext } from '../../context/ExternalHandlerContext';
import { useBlock } from '../../hooks/useBlock';
import { getBlockType } from '../../utils/getBlockType';
import { isElementTypeName } from '../Grid/utils';

type TextEditorProps = TextCommonProps & {
  editor: ReturnType<typeof useTiptapEditor> | null;
};

export const TextEditor = ({
  editor,
  focusWhenCreated = false,
  parentType = 'Text',
}: TextEditorProps) => {
  const { id } = useNode();
  const {
    actions: { setProp },
  } = useEditor();

  // GTM
  const { onClickEditorToolbarButtons } = useContext(ExternalHandlerContext);
  const { findBlockElement } = useBlock();

  useEffect(() => {
    if (focusWhenCreated && editor) {
      editor.commands.focus();

      setProp(id, (prevProp: TextCommonProps) => (prevProp.focusWhenCreated = false));
    }
  }, [focusWhenCreated, editor, id, setProp]);

  const blockElement = findBlockElement();

  const blockType = getBlockType(blockElement);

  if (!editor) {
    return null;
  }

  const handleClickDropdownControl: OnClickDropdownControlCallback = (_, __, label) => {
    onClickEditorToolbarButtons?.({
      controlType: label,
      elementType: isElementTypeName(parentType) ? parentType : null,
      blockType,
    });
  };

  const handleClickButtonControl: OnClickControlCallback = (controlName) => {
    onClickEditorToolbarButtons?.({
      controlType: controlName,
      elementType: isElementTypeName(parentType) ? parentType : null,
      blockType,
    });
  };

  return (
    <>
      <Editor minHeight="auto" height="auto" maxHeight="100%" editor={editor}>
        <Editor.Toolbar type="selection" tooltipWithinPortal>
          <Editor.ToolbarFragment>
            <Editor.ToolbarControlsGroup>
              <Editor.Typo
                headingLevels={HEADINGS_OPTIONS}
                onClickCallback={handleClickDropdownControl}
              />
              <Editor.Color
                textColorPalette={COLOR_CONTROL_PALETTE.color}
                backgroundColorPalette={COLOR_CONTROL_PALETTE.background}
                onClickCallback={handleClickButtonControl}
              />
              <Editor.TextAlign onClickCallback={handleClickButtonControl} />
              <Editor.Bold onClickCallback={handleClickButtonControl} />
              <Editor.Italic onClickCallback={handleClickButtonControl} />
              <Editor.Underline onClickCallback={handleClickButtonControl} />
              <Editor.Blockquote onClickCallback={handleClickButtonControl} />
              <Editor.BulletList onClickCallback={handleClickButtonControl} />
              <Editor.OrderedList onClickCallback={handleClickButtonControl} />
              <Editor.Code onClickCallback={handleClickButtonControl} />
              <Editor.Codeblock onClickCallback={handleClickButtonControl} />
              <Editor.Link onClickCallback={handleClickButtonControl} />
            </Editor.ToolbarControlsGroup>
          </Editor.ToolbarFragment>
        </Editor.Toolbar>
        <Editor.Content />
      </Editor>
    </>
  );
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNode } from '@craftjs/core';
import type {
  OnClickControlCallback,
  OnClickDropdownControlCallback,
  useTiptapEditor,
} from '@inflearn/editor';
import { Editor } from '@inflearn/editor';
import { useContext, useEffect, useRef } from 'react';

import { ExternalHandlerContext } from '../../../context/ExternalHandlerContext';
import { useBlock } from '../../../hooks/useBlock';
import { getBlockType } from '../../../utils/getBlockType';
import { COLOR_LOOKUP } from '../../InfoBox/constants';
import { COLOR_CONTROL_PALETTE, HEADINGS_OPTIONS } from '../editorCommonOptions';
import type { TextCommonProps } from '../types';

type Props = {
  editor: ReturnType<typeof useTiptapEditor> | null;
  color: string;
} & Omit<TextCommonProps, 'parentType'>;

export const InfoBoxText = ({ editor, color, focusWhenCreated = false }: Props) => {
  const {
    actions: { setProp },
  } = useNode();

  // GTM
  const { onClickEditorToolbarButtons } = useContext(ExternalHandlerContext);
  const { findBlockElement } = useBlock();
  const blockElement = findBlockElement();
  const blockType = getBlockType(blockElement);

  const prevColorRef = useRef<string>(color);

  useEffect(() => {
    if (focusWhenCreated && editor) {
      editor.commands.focus();
      setProp((prevProps: Props) => (prevProps.focusWhenCreated = false));
    }
  }, [focusWhenCreated, editor, setProp]);

  useEffect(() => {
    if (editor && prevColorRef.current !== color) {
      const textColor = COLOR_LOOKUP[color]?.textColor;

      // 전체 텍스트에 color 적용
      editor.commands.selectAll();
      editor.commands.setColor(textColor);
      editor.commands.setTextSelection(editor.state.selection.to);

      prevColorRef.current = color;
    }
  }, [color, editor]);

  const handleClickDropdownControl: OnClickDropdownControlCallback = (_, __, label) => {
    onClickEditorToolbarButtons?.({
      controlType: label,
      elementType: 'InfoBox',
      blockType,
    });
  };

  const handleClickButtonControl: OnClickControlCallback = (controlName) => {
    onClickEditorToolbarButtons?.({
      controlType: controlName,
      elementType: 'InfoBox',
      blockType,
    });
  };

  if (!editor) {
    return null;
  }

  return (
    <Editor minHeight="24px" height="100%" maxHeight="100%" editor={editor}>
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
  );
};

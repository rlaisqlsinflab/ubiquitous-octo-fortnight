import { useEditor, useNode } from '@craftjs/core';
import type { SlashCommandItem } from '@inflearn/editor';
import { InflearnEditorStarterKit } from '@inflearn/editor';
import { faSquareInfo, faText, faImage, faVideo, faWallet } from '@inflearn/pro-regular-svg-icons';
import { useCallback, useEffect, useMemo } from 'react';

import { EDITOR_MAX_IMAGE_SIZE } from './editorCommonOptions';
import { TextEditor } from './TextEditor';
import type { SetExtensionsParams, TextCommonProps } from './types';
import { useCreateInflearnEditor } from './useCreateInflearnEditor';
import { useAddNode } from '../../hooks/useAddNode';
import { useBlockElement } from '../../hooks/useBlock/useBlockElement';
import { useHasPaywall } from '../../hooks/useHasPaywall';
import { ActionMenu } from '../ActionMenu';
import {
  OneToTwoColumnIcon,
  SeparatorIcon,
  ThreeColumnIcon,
  TwoColumnIcon,
  TwoToOneColumnIcon,
} from '../Grid/ActionButtons/Icons';
import OneColumnImageText from '../Grid/OneColumnImageText';
import OneColumnInfoBox from '../Grid/OneColumnInfoBox';
import OneColumnPaywall from '../Grid/OneColumnPaywall';
import OneColumnSeparator from '../Grid/OneColumnSeparator';
import OneColumnText from '../Grid/OneColumnText';
import OneColumnVideoText from '../Grid/OneColumnVideoText';
import OneToTwoColumnText from '../Grid/OneToTwoColumnText';
import ThreeColumnText from '../Grid/ThreeColumnText';
import TwoColumnText from '../Grid/TwoColumnText';
import TwoToOneColumnText from '../Grid/TwoToOneColumnText';
import { useReplaceNode } from '../Grid/useReplaceNode';

export const TEXT_VIEW_MODE_CLASSNAME = 'text-view-mode';

type TextProps = {
  nodeId?: string;
  content?: string;
  placeholder?: string;
  align?: 'left' | 'center' | 'right';
  withSlashCommands?: boolean;
} & TextCommonProps;

export const Text = ({
  nodeId: _nodeId,
  content = '',
  placeholder = '본문을 입력해주세요',
  align = 'left',
  withSlashCommands = true,
  ...rest
}: TextProps) => {
  const { id } = useNode();
  const nodeId = _nodeId ?? id;

  const { findBlockElement } = useBlockElement();
  const { actions, query } = useEditor();
  const { addNode } = useAddNode({ id: nodeId });
  const { replaceNode } = useReplaceNode();
  const { hasPaywall, enabledPaywallOption } = useHasPaywall();
  const slashCommandEnabled = !hasPaywall && enabledPaywallOption;

  const paywallSlashOption: SlashCommandItem = useMemo(
    () => ({
      id: 'paywall',
      icon: faWallet,
      label: '유료 구간',
      group: '삽입 요소',
      filters: ['유료 구간', 'paywall'],
      action: ({ editor: _editor, range }) => {
        _editor.chain().deleteRange(range).run();

        const isEditorEmpty = _editor.isEmpty;

        if (isEditorEmpty) {
          replaceNode({ Component: OneColumnPaywall, id: nodeId });
        } else {
          addNode(OneColumnPaywall);
        }
      },
    }),
    [addNode, replaceNode]
  );

  const getSlashCommandItems = useCallback(
    (hasPaywallEnabled: boolean): SlashCommandItem[] => [
      {
        id: 'text',
        icon: faText,
        label: '텍스트',
        group: '삽입 요소',
        filters: ['텍스트', 'text', 'paragraph'],
        action: ({ editor: _editor, range }) => {
          _editor.chain().deleteRange(range).run();
          addNode(OneColumnText);
        },
      },
      {
        id: 'info',
        icon: faSquareInfo,
        label: '정보박스',
        group: '삽입 요소',
        filters: ['정보박스', 'info', 'infobox'],
        action: ({ editor: _editor, range }) => {
          _editor.chain().deleteRange(range).run();

          const isEditorEmpty = _editor.isEmpty;
          const blockParent = findBlockElement({ id });

          if (!blockParent) {
            return;
          }

          if (isEditorEmpty) {
            replaceNode({ Component: OneColumnInfoBox, id: blockParent.id });
          } else {
            addNode(OneColumnInfoBox);
          }
        },
      },
      {
        id: 'image',
        icon: faImage,
        label: '이미지',
        group: '삽입 요소',
        filters: ['이미지', 'image', 'img'],
        action: ({ editor: _editor, range }) => {
          _editor.chain().deleteRange(range).run();
          const isEditorEmpty = _editor.isEmpty;
          const blockParent = findBlockElement({ id });

          if (!blockParent) {
            return;
          }

          if (isEditorEmpty) {
            replaceNode({ Component: OneColumnImageText, id: blockParent.id });
          } else {
            addNode(OneColumnImageText);
          }
        },
      },
      {
        id: 'video',
        icon: faVideo,
        label: '동영상',
        group: '삽입 요소',
        filters: ['동영상', 'video'],
        action: ({ editor: _editor, range }) => {
          _editor.chain().deleteRange(range).run();
          const isEditorEmpty = _editor.isEmpty;
          const blockParent = findBlockElement({ id });

          if (!blockParent) {
            return;
          }

          if (isEditorEmpty) {
            replaceNode({ Component: OneColumnVideoText, id: blockParent.id });
          } else {
            addNode(OneColumnVideoText);
          }
        },
      },
      ...(hasPaywallEnabled ? [paywallSlashOption] : []),
      {
        id: 'two-column',
        icon: <TwoColumnIcon />,
        label: '2열',
        group: '레이아웃',
        filters: ['2열', 'two column', 'column', 'grid', 'two grid'],
        action: ({ editor: _editor, range }) => {
          _editor.chain().deleteRange(range).run();

          addNode(TwoColumnText);
        },
      },
      {
        id: 'one-to-two-column',
        icon: <OneToTwoColumnIcon />,
        label: '2열 (1:2)',
        group: '레이아웃',
        filters: ['2열 (1:2)', 'one two column', 'column', 'grid', 'one two grid'],
        action: ({ editor: _editor, range }) => {
          _editor.chain().deleteRange(range).run();

          addNode(OneToTwoColumnText);
        },
      },
      {
        id: 'two-to-one-column',
        icon: <TwoToOneColumnIcon />,
        label: '2열 (2:1)',
        group: '레이아웃',
        filters: ['2열 (2:1)', 'two one column', 'column', 'grid', 'two one grid'],
        action: ({ editor: _editor, range }) => {
          _editor.chain().deleteRange(range).run();

          addNode(TwoToOneColumnText);
        },
      },
      {
        id: 'three-column',
        icon: <ThreeColumnIcon />,
        label: '3열',
        group: '레이아웃',
        filters: ['3열', 'three column', 'column', 'grid', 'three grid'],
        action: ({ editor: _editor, range }) => {
          _editor.chain().deleteRange(range).run();

          addNode(ThreeColumnText);
        },
      },
      {
        id: 'separator',
        icon: <SeparatorIcon />,
        label: '구분',
        group: '레이아웃',
        filters: ['구분', 'separator', 'divider'],
        action: ({ editor: _editor, range }) => {
          _editor.chain().deleteRange(range).run();
          const isEditorEmpty = _editor.isEmpty;
          const blockParent = findBlockElement({ id });

          if (!blockParent) {
            return;
          }

          if (isEditorEmpty) {
            replaceNode({ Component: OneColumnSeparator, id: blockParent.id });
          } else {
            addNode(OneColumnSeparator);
          }
        },
      },
    ],
    [addNode, replaceNode, paywallSlashOption]
  );

  const { editor } = useCreateInflearnEditor<TextProps>({
    nodeId: id,
    history: actions.history,
    query,
    placeholder,
    content,
    setExtensions: (params: SetExtensionsParams) => [
      InflearnEditorStarterKit.configure({
        dropcursor: {
          width: 2,
        },
        image: {
          maxImageSize: EDITOR_MAX_IMAGE_SIZE,
          showNotification: params.showNotification,
          uploadFormData: params.uploadImageFormData,
        },
        link: {
          openOnClick: false,
        },
        textAlign: {
          defaultAlignment: align,
        },
        placeholder: {
          placeholder: params.placeholder,
        },
        ...(withSlashCommands
          ? {
              slashCommands: {
                items: getSlashCommandItems(slashCommandEnabled),
              },
            }
          : {}),
      }),
    ],
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (!withSlashCommands) {
      return;
    }

    editor.commands.setSlashCommands(getSlashCommandItems(slashCommandEnabled));
  }, [slashCommandEnabled, withSlashCommands, editor, getSlashCommandItems]);

  return (
    <ActionMenu>
      <TextEditor {...rest} editor={editor} />
    </ActionMenu>
  );
};

Text.displayName = 'Text';

Text.craft = {
  displayName: 'Text',
};

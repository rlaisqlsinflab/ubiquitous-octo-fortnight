import { useEditor, useNode } from '@craftjs/core';
import { InflearnEditorStarterKit } from '@inflearn/editor';
import { faSquareInfo, faImage, faVideo } from '@inflearn/pro-regular-svg-icons';

import { EDITOR_MAX_IMAGE_SIZE } from './editorCommonOptions';
import { TextEditor } from './TextEditor';
import type { SetExtensionsParams, TextCommonProps } from './types';
import { useCreateInflearnEditor } from './useCreateInflearnEditor';
import { ActionMenu } from '../ActionMenu';
import { useReplaceNode } from '../Grid/useReplaceNode';
import { ImageText } from '../ImageText/ImageText';
import { InfoBox } from '../InfoBox/InfoBox';
import { VideoText } from '../VideoText/VideoText';

type TextProps = {
  nodeId?: string;
  content?: string;
  placeholder?: string;
} & TextCommonProps;

export const ColumnText = ({
  nodeId: _nodeId,
  content = '',
  placeholder = '본문을 입력해주세요',
  ...rest
}: TextProps) => {
  const { id } = useNode();
  const nodeId = _nodeId ?? id;
  const { actions, query } = useEditor();
  const { replaceNode } = useReplaceNode();

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
        placeholder: {
          placeholder: params.placeholder,
        },
        slashCommands: {
          items: [
            {
              id: 'info',
              icon: faSquareInfo,
              label: '정보박스',
              group: '삽입 요소',
              filters: ['정보박스', 'info', 'infobox'],
              action: ({ editor: _editor, range }) => {
                _editor.chain().deleteRange(range).run();

                replaceNode({ Component: InfoBox, id: nodeId, props: { column: 2 } });
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

                replaceNode({ Component: ImageText, id: nodeId, props: { column: 2 } });
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

                replaceNode({ Component: VideoText, id: nodeId, props: { column: 2 } });
              },
            },
          ],
        },
      }),
    ],
  });

  return (
    <ActionMenu>
      <TextEditor {...rest} editor={editor} />
    </ActionMenu>
  );
};

ColumnText.displayName = 'ColumnText';

ColumnText.craft = {
  displayName: 'ColumnText',
};

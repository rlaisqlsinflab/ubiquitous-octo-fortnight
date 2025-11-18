import { useEditor, useNode } from '@craftjs/core';
import { Button } from '@inflearn/ds-react';
import { isNil } from 'lodash-es';
import { useEffect, useRef } from 'react';

import { ColorPicker } from './ActionMenu/ColorPicker';
import { ToggleIcon } from './ActionMenu/ToggleIcon';
import { COLOR_LOOKUP, COLORS } from './constants';
import { ActionMenu } from '../ActionMenu';
import { useDeleteNode } from '../Grid/useDeleteNode';
import { useReplaceNode } from '../Grid/useReplaceNode';
import { ColumnText } from '../Text/ColumnText';
import { infoBoxEditorExtensions } from '../Text/InfoBoxText/infoBoxEditorExtensions';
import { InfoBoxText } from '../Text/InfoBoxText/InfoBoxText';
import { Text } from '../Text/Text';
import { useCreateInflearnEditor } from '../Text/useCreateInflearnEditor';

type Props = {
  hasLeftIcon?: boolean;
  color?: string;
  content?: string;
  focusWhenCreated?: boolean;
  placeholder?: string;
  column?: number;
};

export const INFO_BOX_CLASSNAME = 'info-box';

const DEFAULT_PROPS: Required<Props> = {
  hasLeftIcon: false,
  color: 'gray',
  content: '',
  focusWhenCreated: false,
  placeholder: '본문을 입력해주세요',
  column: 1,
};

export const InfoBox = ({
  hasLeftIcon = DEFAULT_PROPS.hasLeftIcon,
  color = DEFAULT_PROPS.color,
  focusWhenCreated = DEFAULT_PROPS.focusWhenCreated,
  content = DEFAULT_PROPS.content,
  placeholder = DEFAULT_PROPS.placeholder,
  column,
}: Props) => {
  const {
    id,
    actions: { setProp },
  } = useNode();
  const {
    actions: { history },
    query,
  } = useEditor();
  const { replaceNode } = useReplaceNode();
  const { deleteNode } = useDeleteNode();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChangeColor = (targetColor: string) => {
    setProp((prevProps: Props) => (prevProps.color = targetColor));
  };

  const handleChangeHasIcon = (value: boolean) => {
    setProp((prevProps: Props) => (prevProps.hasLeftIcon = value));
  };

  const resizeTextarea = () => {
    if (inputRef.current) {
      inputRef.current.style.height = '24px';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [content]);

  const { editor } = useCreateInflearnEditor<Props>({
    nodeId: id,
    history,
    query,
    placeholder,
    content,
    setExtensions: infoBoxEditorExtensions,
  });

  const handleDelete = () => {
    if (isNil(column)) {
      deleteNode(id);
    }

    if (column === 1) {
      replaceNode({ Component: Text, id });

      return;
    }

    replaceNode({ Component: ColumnText, id });
  };

  return (
    <ActionMenu
      actionButtons={
        <>
          <ToggleIcon value={hasLeftIcon} color={color} onChange={handleChangeHasIcon} />
          <ColorPicker value={color} onChange={handleChangeColor} />
          <Button
            h={28}
            variant="light"
            color="gray"
            size="xs"
            compact
            radius="md"
            onClick={handleDelete}
            title="인포박스 삭제">
            초기화
          </Button>
        </>
      }>
      <div
        className={`${INFO_BOX_CLASSNAME} ${INFO_BOX_CLASSNAME}--${color}`}
        aria-labelledby="info-box__editable-aria">
        {hasLeftIcon && (
          <div
            className="info-box__icon"
            dangerouslySetInnerHTML={{
              __html: COLOR_LOOKUP[color]?.icon || COLOR_LOOKUP[COLORS.BLUE].icon,
            }}
          />
        )}
        <InfoBoxText editor={editor} color={color} focusWhenCreated={focusWhenCreated} />
      </div>
    </ActionMenu>
  );
};
InfoBox.craft = {
  defaultProps: DEFAULT_PROPS,
  displayName: 'InfoBox',
};

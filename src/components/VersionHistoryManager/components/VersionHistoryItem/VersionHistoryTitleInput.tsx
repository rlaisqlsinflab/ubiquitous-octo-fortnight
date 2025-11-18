import { ApiError } from '@inflearn/course-fetch';
import { COLOR_PALETTE, TextInput, useShowNotification } from '@inflearn/ds-react';
import dayjs from 'dayjs';
import type { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from 'react';
import { useRef } from 'react';
import { forwardRef, useState } from 'react';

import type { ChangeTitleSetter } from './types';
import type { History } from '../../types';
import { HISTORY_TYPE } from '../../types';

type Props = {
  initialValue: string;
  onChangeTitle: ChangeTitleSetter;
  className?: string;
  history: History;
};

export const VersionHistoryTitleInput = forwardRef<HTMLInputElement, Props>(
  ({ initialValue, onChangeTitle, className, history }, ref) => {
    const [title, setTitle] = useState(initialValue);
    const savedTitle = useRef<string>(initialValue); // 서버에 저장된 title 을 의미한다.
    const isNotChangedTitle = title === savedTitle.current;
    const { showNotification } = useShowNotification();
    const isPublishType = history.type === HISTORY_TYPE.PUBLISH;

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setTitle(event.target.value);
    };

    const changeTitle = async (_history: History) => {
      try {
        const parsedTitle =
          title.trim().length === 0 ? dayjs(_history.savedAt).format('YY.MM HH:mm') : title.trim();
        await onChangeTitle(_history, parsedTitle);

        setTitle(parsedTitle);
        savedTitle.current = parsedTitle;

        showNotification({
          type: 'success',
          title: '제목이 변경되었어요.',
        });
      } catch (error) {
        if (!(error instanceof ApiError)) {
          return;
        }

        throw error;
      }
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = async () => {
      if (isNotChangedTitle) {
        return;
      }

      changeTitle(history);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.nativeEvent.isComposing !== false) {
        return;
      }

      if (isNotChangedTitle) {
        return;
      }

      if (event.key === 'Enter') {
        changeTitle(history);
      }
    };

    return (
      <TextInput
        ref={ref}
        value={title}
        variant="unstyle"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={className}
        size="sm"
        styles={{
          input: {
            color: COLOR_PALETTE.gray[9],
            fontWeight: isPublishType ? 700 : 600,
            background: 'transparent',
            borderColor: 'transparent',
            cursor: 'pointer',
            ':focus': {
              borderColor: COLOR_PALETTE.gray[4],
              cursor: 'text',
            },
          },
          root: {
            flex: 1,
          },
        }}
      />
    );
  }
);

VersionHistoryTitleInput.displayName = 'VersionHistoryTitleInput';

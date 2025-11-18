import { Box, COLOR_PALETTE, Flex } from '@inflearn/ds-react';
import type { ElementType } from 'react';
import { useRef } from 'react';

import type { ChangeTitleSetter, PreviewSetter, RestoreSetter } from './types';
import { VersionHistoryMoreButton } from './VersionHistoryMoreButton';
import { VersionHistoryStatusBadge } from './VersionHistoryStatusBadge';
import { VersionHistoryStatusDescription } from './VersionHistoryStatusDescription';
import { VersionHistoryTitleInput } from './VersionHistoryTitleInput';
import { VersionHistoryWriter } from './VersionHistoryWriter';
import type { History } from '../../types';
import { getHistoryName } from '../../utils';

export type Props = {
  history: History;
  onClickRestore: RestoreSetter;
  onClickPreview?: PreviewSetter;
  onChangeTitle: ChangeTitleSetter;
  previewOriginUrl: string;
  isRestoreLoading: boolean;
  component?: ElementType;
};

export function VersionHistoryItem({
  history,
  onClickRestore,
  onClickPreview,
  onChangeTitle,
  previewOriginUrl,
  isRestoreLoading,
  component = 'div',
}: Props) {
  const versionHistoryTitleInputRef = useRef<HTMLInputElement>(null);

  const handleClickChangeTitle = () => {
    if (!versionHistoryTitleInputRef.current) {
      return;
    }

    versionHistoryTitleInputRef.current.focus();
  };

  const titleInputInitialValue = getHistoryName(history);

  return (
    <Flex<HTMLElement>
      id={`version-history-item-${String(history.id)}`}
      justify="space-between"
      component={component}
      p="md"
      css={{
        borderBottom: `1px solid ${COLOR_PALETTE.gray[3]}`,
        '&:hover': {
          backgroundColor: COLOR_PALETTE.gray[0],
          '& > .version-history__more-button': {
            display: 'block',
          },
        },
      }}>
      <Box>
        <Flex align="center">
          <VersionHistoryStatusBadge type={history.type} />
          <VersionHistoryTitleInput
            ref={versionHistoryTitleInputRef}
            initialValue={titleInputInitialValue}
            onChangeTitle={onChangeTitle}
            history={history}
          />
        </Flex>
        <VersionHistoryStatusDescription origin={history.origin} />
        <VersionHistoryWriter type={history.type} name={history.userName} />
      </Box>
      <Box className="version-history__more-button" display="none">
        <VersionHistoryMoreButton
          history={history}
          previewUrl={`${previewOriginUrl}/${history.id}`}
          onClickChangeTitle={handleClickChangeTitle}
          onClickRestore={onClickRestore}
          onClickPreview={onClickPreview}
          isRestoreLoading={isRestoreLoading}
        />
      </Box>
    </Flex>
  );
}

import { ActionIcon, Icon, Menu } from '@inflearn/ds-react';
import { faEllipsisVertical } from '@inflearn/pro-regular-svg-icons';

import type { PreviewSetter, RestoreSetter } from './types';
import { useVersionHistoryRestoreModal } from '../../context/VersionHistoryModalProvider';
import type { History } from '../../types';

type Props = {
  onClickChangeTitle: () => void;
  onClickRestore: RestoreSetter;
  onClickPreview?: PreviewSetter;
  previewUrl: string;
  history: History;
  isRestoreLoading: boolean;
};

export function VersionHistoryMoreButton({
  onClickChangeTitle,
  onClickPreview,
  onClickRestore,
  previewUrl,
  history,
  isRestoreLoading,
}: Props) {
  const { openModal } = useVersionHistoryRestoreModal();

  const handleClickRestore = () =>
    openModal({
      history,
      onClickRestore,
      isRestoreLoading,
    });

  const handleClickPreview = () => {
    onClickPreview?.(history);
  };

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon type="button" variant="subtle" color="gray" size="md" aria-label="메뉴 더보기">
          <Icon icon={faEllipsisVertical} size="sm" />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={onClickChangeTitle}>제목 수정</Menu.Item>
        <Menu.Item onClick={handleClickRestore}>이 버전 복원</Menu.Item>
        <Menu.Item onClick={handleClickPreview} component="a" target="_blank" href={previewUrl}>
          미리보기
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

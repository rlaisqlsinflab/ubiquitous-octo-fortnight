import { ApiError } from '@inflearn/course-fetch';
import { Button, Modal, Text, useShowNotification } from '@inflearn/ds-react';

import type { RestoreSetter } from './types';
import type { History } from '../../types';
import { getHistoryName } from '../../utils';

type Props = {
  opened: boolean;
  onClose: () => void;
  onClickRestore: RestoreSetter;
  history: History;
  isRestoreLoading: boolean;
};

export const VersionHistoryRestoreModal = ({
  history,
  opened,
  onClose,
  onClickRestore,
  isRestoreLoading,
}: Props) => {
  const { showNotification } = useShowNotification();

  const onClick = async () => {
    try {
      await onClickRestore(history);

      showNotification({
        type: 'success',
        title: `${getHistoryName(history)}로 부터 복원되었어요.`,
      });

      onClose();
    } catch (error) {
      if (!(error instanceof ApiError)) {
        showNotification({
          type: 'error',
          title: '버전 복원에 실패하였습니다.',
        });

        return;
      }

      if (error.isUnauthorized) {
        showNotification({
          type: 'error',
          title: '권한이 없습니다.',
        });
      }

      if (error.isNotFound) {
        showNotification({
          type: 'error',
          title: '해당 버전을 찾을 수 없습니다.',
        });
      }

      throw error;
    }
  };

  return (
    <Modal.Root opened={opened} onClose={onClose} id="save-confirm-modal" size="md">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{getHistoryName(history)} 버전으로 복원하시겠습니까?</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text mt={0} mb={21}>
            해당 버전은 임시저장됩니다. 실제 페이지에 반영을 원하시면 게시를 선택해주세요.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button size="md" radius="md" variant="default" onClick={onClose}>
            취소
          </Button>
          <Button
            data-autofocus
            size="md"
            radius="md"
            variant="filled"
            color="infgreen"
            onClick={onClick}
            loading={isRestoreLoading}>
            복원
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

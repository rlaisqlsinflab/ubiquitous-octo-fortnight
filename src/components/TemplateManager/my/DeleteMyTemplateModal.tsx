import { Button, Modal } from '@inflearn/ds-react';

type DeleteMyTemplateModalProps = {
  opened: boolean;
  onClose: () => void;
  onClickDelete: () => void;
};

export const DeleteMyTemplateModal = ({
  opened,
  onClose,
  onClickDelete,
}: DeleteMyTemplateModalProps) => {
  return (
    <Modal.Root opened={opened} onClose={onClose} size="xs">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>템플릿 삭제</Modal.Title>
          <Modal.CloseButton size="md" />
        </Modal.Header>
        <Modal.Body>해당 템플릿을 내 템플릿에서 삭제하시겠어요?</Modal.Body>
        <Modal.Footer>
          <Button size="md" variant="default" onClick={onClose}>
            취소
          </Button>
          <Button size="md" variant="filled" color="red" onClick={onClickDelete}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

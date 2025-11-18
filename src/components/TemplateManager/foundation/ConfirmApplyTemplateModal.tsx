import { Button, Modal } from '@inflearn/ds-react';

type ModalProps = {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
export const ConfirmApplyTemplateModal = ({ opened, onClose, onConfirm }: ModalProps) => (
  <Modal.Root trapFocus opened={opened} onClose={onClose}>
    <Modal.Overlay />
    <Modal.Content>
      <Modal.Header>
        <Modal.Title>템플릿 적용</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>기존 작성한 내용이 사라집니다. 그래도 템플릿을 적용하시겠어요?</Modal.Body>
      <Modal.Footer>
        <Button aria-label="템플릿 적용 취소" onClick={onClose} variant="default">
          취소
        </Button>
        <Button aria-label="템플릿 적용" onClick={onConfirm} data-autofocus>
          그래도 적용
        </Button>
      </Modal.Footer>
    </Modal.Content>
  </Modal.Root>
);

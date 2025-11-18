/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Modal, Text } from '@inflearn/ds-react';
import type { ReactNode } from 'react';
import { createContext, useState } from 'react';

type Props = {
  onClose: () => void;
  opened: boolean;
};

type ImageUploadErrorContextType = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
};

const initialContextVaule: ImageUploadErrorContextType = {
  opened: false,
  setOpened: () => {},
  openModal: () => {},
  closeModal: () => {},
};

export const ImageUploadErrorContext =
  createContext<ImageUploadErrorContextType>(initialContextVaule);

const ImageUploadErrorModal = ({ onClose, opened }: Props) => {
  return (
    <Modal.Root opened={opened} onClose={onClose} id="image-upload-error-modal" size="xs">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>업로드 실패</Modal.Title>
          <Modal.CloseButton onClick={onClose} />
        </Modal.Header>
        <Modal.Body>
          <Text color="gray.7">
            업로드중에 일시적인 오류가 발생했습니다. 문제가 반복되면 관리자에게 문의해주세요.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} color="infgreen" variant="filled" size="md">
            확인
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

export const ImageUploadErrorModalProvider = ({ children }: { children: ReactNode }) => {
  const [opened, setOpened] = useState(false);

  const onClose = () => {
    setOpened(false);
  };

  const openModal = () => {
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
  };

  return (
    <ImageUploadErrorContext.Provider value={{ opened, setOpened, openModal, closeModal }}>
      {children}
      <ImageUploadErrorModal opened={opened} onClose={onClose} />
    </ImageUploadErrorContext.Provider>
  );
};

export default ImageUploadErrorModalProvider;

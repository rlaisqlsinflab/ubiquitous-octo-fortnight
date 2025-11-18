import { Button, Group, Modal, TextInput } from '@inflearn/ds-react';
import type { ChangeEventHandler } from 'react';
import { useContext, useState } from 'react';

import { TemplateMarketingCallbackContext } from '../context/TemplateMarketingCallbackContext';

const TEMPLATE_TITLE_MAX_LENGTH = 17;

const MY_TEMPLATE_MODAL_MODE = {
  create: 'create',
  update: 'update',
} as const;

type MyTemplateSaveModalProps = {
  mode: keyof typeof MY_TEMPLATE_MODAL_MODE;
  opened: boolean;
  close: () => void;
  onSubmit: (title: string, onSuccess: () => void) => Promise<void>;
  initialValue?: string;
};

export function MyTemplateSaveModal({
  mode,
  opened,
  close,
  onSubmit,
  initialValue = '',
}: MyTemplateSaveModalProps) {
  const { onClickCreateMyTemplateButton } = useContext(TemplateMarketingCallbackContext);

  const modalId = `my-template-${mode}-modal`;
  const labelByMode = mode === MY_TEMPLATE_MODAL_MODE.create ? '저장' : '제목 수정';

  const [templateTitle, setTemplateTitle] = useState(initialValue);

  const onClose = () => {
    setTemplateTitle(initialValue);
    close();
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value.length > TEMPLATE_TITLE_MAX_LENGTH) {
      return;
    }

    setTemplateTitle(event.target.value);
  };

  return (
    <Modal.Root opened={opened} onClose={onClose} id={modalId} size="xs">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>템플릿 {labelByMode}</Modal.Title>
          <Modal.CloseButton onClick={onClose} />
        </Modal.Header>
        <Modal.Body css={{ overflow: 'visible' }}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              if (mode === MY_TEMPLATE_MODAL_MODE.create) {
                onClickCreateMyTemplateButton?.(templateTitle);
              }

              await onSubmit(templateTitle, () => {
                if (mode === MY_TEMPLATE_MODAL_MODE.create) {
                  setTemplateTitle('');
                }
              });
            }}>
            <TextInput
              data-autofocus
              value={templateTitle}
              onChange={onChange}
              placeholder="저장할 이름을 입력해주세요."
              size="sm"
              description={`${templateTitle.length}/${TEMPLATE_TITLE_MAX_LENGTH}`}
              styles={{
                description: {
                  textAlign: 'right',
                },
              }}
              mb={16}
            />
            <Group position="right" spacing="md">
              <Button onClick={onClose} color="infgreen" variant="default" size="md">
                취소
              </Button>
              <Button
                type="submit"
                color="infgreen"
                variant="filled"
                size="md"
                disabled={templateTitle.trim().length === 0}>
                저장
              </Button>
            </Group>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

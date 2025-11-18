import { Button, Popover } from '@inflearn/ds-react';
import React, { useEffect, useState } from 'react';

import { TextPopover } from '../../TextPopover';

type Props = {
  initialImageAlt: string;
  onSetImageAlt: (alt: string) => void;
  opened: boolean;
  onOpenImageAltInput: () => void;
  onCloseImageAltInput: () => void;
};

const TEXT_POPOVER_CLASS_NAME = 'dropzone-preview__alt-form';
const ADD_ALT_BUTTON_CLASS_NAME = 'dropzone-preview__alt-add_button';

export const DropzoneAlt = ({
  initialImageAlt = '',
  onSetImageAlt,
  opened,
  onOpenImageAltInput,
  onCloseImageAltInput,
}: Props) => {
  const [imageAltInput, setImageAltInput] = useState(initialImageAlt);

  const handleClickImageAltButton = () => {
    if (opened) {
      onCloseImageAltInput();

      return;
    }

    onOpenImageAltInput();
  };

  return (
    <Popover
      styles={{
        dropdown: {
          padding: 0,
        },
      }}
      trapFocus
      opened={opened}
      shadow="sm"
      position="top"
      transitionProps={{ duration: 0 }}>
      <Popover.Target>
        <Button
          type="button"
          variant="subtle"
          size="xs"
          h={28}
          compact
          radius="md"
          color="gray"
          onClick={handleClickImageAltButton}
          className={ADD_ALT_BUTTON_CLASS_NAME}>
          대체 텍스트
        </Button>
      </Popover.Target>
      <Popover.Dropdown className="dropzone-preview__hyperlink">
        <DropzoneAltTextPopoverDropdown
          onSetImageAlt={onSetImageAlt}
          onCloseImageAltInput={onCloseImageAltInput}
          imageAltInput={imageAltInput}
          setImageAltInput={setImageAltInput}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

type DropzoneAltTextPopoverDropdownProps = {
  onSetImageAlt: (alt: string) => void;
  onCloseImageAltInput: () => void;
  imageAltInput: string;
  setImageAltInput: (alt: string) => void;
};

function DropzoneAltTextPopoverDropdown({
  onSetImageAlt,
  onCloseImageAltInput,
  imageAltInput,
  setImageAltInput,
}: DropzoneAltTextPopoverDropdownProps) {
  const handleSave = () => {
    onSetImageAlt(imageAltInput);

    onCloseImageAltInput();
  };

  const handleChangeAlt: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setImageAltInput(value);
  };

  const clickOutsideEventListener = (event: MouseEvent) => {
    const $target = event.target as HTMLElement;

    if ($target.closest(`.${TEXT_POPOVER_CLASS_NAME}`)) {
      return;
    }

    if ($target.closest(`.${ADD_ALT_BUTTON_CLASS_NAME}`)) {
      handleSave();

      return;
    }

    handleSave();
    onCloseImageAltInput();
  };

  // NOTE: 캡처링을 해야 합니다.
  // 캡처링 과정 : window (false) -> target (true)
  // 버블링 과정 : target (true) -> window (false)
  // window에 click 이벤트를 추가한 이유는 화면의 어느 영역을 클릭했느냐에 따라 동작을 달리하기 위해서 입니다.
  // 임배드 입력 영역 외부를 클릭하면 캡처링이든 버블링이든 상관없이 showEmbedLinkInput를 false로 설정하기 때문에 상관 없습니다.
  // 만약 임배드 링크를 클릭했다면 캡처링과 버블링 과정이 다릅니다.
  // 버블링을 하게 되면 리스너에서 target인 경우 아무런 동작을 하지 않지만 window로 올라가면서 false 처리가 됩니다.
  // 반면 캡처링인 경우 window에서 먼저 false를 처리하고 target에서 true가 되기 때문에 임배드 링크 입력창이 닫히지 않습니다
  useEffect(() => {
    document.addEventListener('click', clickOutsideEventListener, true);

    return () => {
      document.removeEventListener('click', clickOutsideEventListener, true);
    };
  }, [imageAltInput]);

  return (
    <TextPopover
      props={{
        className: TEXT_POPOVER_CLASS_NAME,
      }}
      textInputProps={{
        placeholder: '대체 텍스트로 이미지 설명하기',
        name: 'altImage',
        onChange: handleChangeAlt,
        value: imageAltInput,
      }}
      onSave={handleSave}
    />
  );
}

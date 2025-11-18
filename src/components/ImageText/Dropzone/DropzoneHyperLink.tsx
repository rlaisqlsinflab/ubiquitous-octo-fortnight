import { Group, Popover } from '@inflearn/ds-react';
import React, { useContext, useEffect, useState } from 'react';

import {
  ADD_HYPER_LINK_BUTTON_CLASS_NAME,
  AddHyperLinkButton,
  MoveHyperLinkAnchor,
  RemoveHyperLinkButton,
} from './DropzoneHyperLinkActions';
import { ExternalHandlerContext } from '../../../context/ExternalHandlerContext';
import { useBlock } from '../../../hooks/useBlock';
import { getBlockType } from '../../../utils/getBlockType';
import { sanitizeUrl } from '../../../utils/sanitizeUrl';
import { TextPopover } from '../../TextPopover';

type HyperLinkProps = {
  onSetImageHyperLink: (hyperLink: string) => void;
  onResetImageHyperLink: () => void;
  initialHyperLink: string;
  opened: boolean;
  onOpenImageHyperLinkInput: () => void;
  onCloseImageHyperLinkInput: () => void;
};

export const DropzoneHyperLink = ({
  onSetImageHyperLink,
  onResetImageHyperLink,
  initialHyperLink = '',
  opened,
  onOpenImageHyperLinkInput,
  onCloseImageHyperLinkInput,
}: HyperLinkProps) => {
  const [hyperLinkInput, setHyperLinkInput] = useState(initialHyperLink);

  const handleClickAddHyperLinkButton = () => {
    if (opened) {
      onCloseImageHyperLinkInput();

      return;
    }

    onOpenImageHyperLinkInput();
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
        <AddHyperLinkButton handleClick={handleClickAddHyperLinkButton} />
      </Popover.Target>
      <Popover.Dropdown className="dropzone-preview__hyperlink">
        <DropzoneHyperLinkTextPopoverDropdown
          isSaved={!!initialHyperLink}
          onSetImageHyperLink={onSetImageHyperLink}
          onResetImageHyperLink={onResetImageHyperLink}
          hyperLinkInput={hyperLinkInput}
          setHyperLinkInput={setHyperLinkInput}
          onCloseImageHyperLinkInput={onCloseImageHyperLinkInput}
          opened={opened}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

const TEXT_POPOVER_CLASS_NAME = 'dropzone-preview__hyperlink-form';

type DropzoneHyperLinkTextPopoverDropdownProps = {
  onSetImageHyperLink: (hyperLink: string) => void;
  onResetImageHyperLink: () => void;
  hyperLinkInput: string;
  setHyperLinkInput: (hyperLink: string) => void;
  onCloseImageHyperLinkInput: () => void;
  opened: boolean;
  isSaved: boolean;
};

function DropzoneHyperLinkTextPopoverDropdown({
  onSetImageHyperLink,
  onResetImageHyperLink,
  hyperLinkInput,
  setHyperLinkInput,
  onCloseImageHyperLinkInput,
  opened,
  isSaved,
}: DropzoneHyperLinkTextPopoverDropdownProps) {
  const { findBlockElement } = useBlock();
  const blockElement = findBlockElement();
  const blockType = getBlockType(blockElement);

  const { onAddImageTextUrl, onDeleteImageTextUrl } = useContext(ExternalHandlerContext);

  const handleSave = () => {
    const newLink = sanitizeUrl(hyperLinkInput);
    setHyperLinkInput(newLink);
    onSetImageHyperLink(newLink);

    // 믹스패널
    onAddImageTextUrl?.({
      blockType,
      linkUrl: newLink,
    });
  };

  const handleChangeHyperLink: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setHyperLinkInput(value);
  };

  const handleRemoveHyperLink = () => {
    onResetImageHyperLink();
    setHyperLinkInput('');
    onCloseImageHyperLinkInput();

    // 믹스패널
    onDeleteImageTextUrl?.({
      blockType: blockElement ? blockElement.displayName : null,
      linkUrl: hyperLinkInput,
    });
  };

  const handleClickMoveHyperLinkAnchor = () => {
    if (opened) {
      onCloseImageHyperLinkInput();
    }
  };

  const clickOutsideEventListener = (event: MouseEvent) => {
    const $target = event.target as HTMLElement;

    if ($target.closest(`.${TEXT_POPOVER_CLASS_NAME}`)) {
      return;
    }

    if ($target.closest(`.${ADD_HYPER_LINK_BUTTON_CLASS_NAME}`)) {
      handleSave();

      return;
    }

    handleSave();
    onCloseImageHyperLinkInput();
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
  }, [hyperLinkInput]);

  return (
    <TextPopover
      props={{ className: TEXT_POPOVER_CLASS_NAME }}
      textInputProps={{
        placeholder: '링크를 붙여넣어주세요.',
        name: 'imageLink',
        onChange: handleChangeHyperLink,
        value: hyperLinkInput,
      }}
      onSave={handleSave}>
      {isSaved ? (
        <Group spacing={8} ml={8}>
          <RemoveHyperLinkButton handleClick={handleRemoveHyperLink} />
          <MoveHyperLinkAnchor handleClick={handleClickMoveHyperLinkAnchor} href={hyperLinkInput} />
        </Group>
      ) : (
        ''
      )}
    </TextPopover>
  );
}

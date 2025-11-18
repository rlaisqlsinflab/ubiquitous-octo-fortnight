import { ActionIcon, Icon } from '@inflearn/ds-react';
import {
  faArrowUpRightFromSquare,
  faLinkHorizontal,
  faLinkHorizontalSlash,
} from '@inflearn/pro-solid-svg-icons';
import React from 'react';

type LinkCommonProps = {
  handleClick: () => void;
};

export const ADD_HYPER_LINK_BUTTON_CLASS_NAME = 'dropzone-preview__hyperlink-add-button';

export const AddHyperLinkButton = React.forwardRef<HTMLButtonElement | null, LinkCommonProps>(
  ({ handleClick }: LinkCommonProps, ref) => (
    <ActionIcon
      ref={ref}
      variant="subtle"
      size={28}
      onClick={handleClick}
      title="링크 추가"
      className={ADD_HYPER_LINK_BUTTON_CLASS_NAME}>
      <Icon icon={faLinkHorizontal} color="dark.9" />
    </ActionIcon>
  )
);

AddHyperLinkButton.displayName = 'AddHyperLinkButton';

export const RemoveHyperLinkButton = React.forwardRef<HTMLButtonElement | null, LinkCommonProps>(
  ({ handleClick }: LinkCommonProps, ref) => (
    <ActionIcon ref={ref} variant="default" size="n-sm" onClick={handleClick} title="링크 삭제">
      <Icon icon={faLinkHorizontalSlash} />
    </ActionIcon>
  )
);

RemoveHyperLinkButton.displayName = 'RemoveHyperLinkButton';

type MoveHyperLinkAnchorProps = {
  href: string;
} & LinkCommonProps;

export const MoveHyperLinkAnchor = React.forwardRef<
  HTMLAnchorElement | null,
  MoveHyperLinkAnchorProps
>(({ href, handleClick }: MoveHyperLinkAnchorProps, ref) => (
  <ActionIcon
    ref={ref}
    href={href}
    component="a"
    variant="default"
    size="n-sm"
    onClick={handleClick}
    target="_blank"
    title="링크 새창 열기">
    <Icon icon={faArrowUpRightFromSquare} />
  </ActionIcon>
));

MoveHyperLinkAnchor.displayName = 'MoveHyperLinkAnchor';

import { useNode } from '@craftjs/core';
import { ActionIcon, Icon } from '@inflearn/ds-react';
import { faGripLines } from '@inflearn/pro-regular-svg-icons';
import React from 'react';

type HandleProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'formAction'>;

export const Handle = (props: HandleProps) => {
  const {
    connectors: { drag },
  } = useNode();

  return (
    <ActionIcon
      size="n-xs"
      w={20}
      h={24}
      miw="unset"
      mih="unset"
      radius="md"
      ref={(ref) => ref && drag(ref)}
      css={{ cursor: 'grab' }}
      {...props}>
      <Icon icon={faGripLines} size="2xs" color="gray.7" />
    </ActionIcon>
  );
};

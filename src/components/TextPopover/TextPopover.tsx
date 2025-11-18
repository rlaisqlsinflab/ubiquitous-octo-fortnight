import type { Sx, TextInputProps } from '@inflearn/ds-react';
import { Flex, TextInput, Box } from '@inflearn/ds-react';
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import { Z_INDEX } from '../../styles/zIndex';

type TextPopoverProps = {
  rootStyle?: Sx;
  // NOTE: ref 사용하지 않으므로 제거
  props?: Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'>;
  textInputProps?: TextInputProps;
  onSave?: (value: string) => void;
  children?: ReactNode;
};

export const TextPopover = ({
  rootStyle = {},
  props = {},
  textInputProps = {},
  onSave,
  children,
}: TextPopoverProps) => {
  const { className: classNameProp, ...propsOthers } = props;
  const className = `text-popover ${classNameProp || ''}`;

  return (
    <Flex
      sx={(theme) => ({
        zIndex: Z_INDEX.TEXT_POPOVER,
        '> div': {
          padding: 8,
          borderRadius: 8,
          boxShadow: theme.shadows.sm,
          backgroundColor: '#fff',
          display: 'flex',
        },
        ...rootStyle,
      })}
      className={className}
      {...propsOthers}>
      <Box>
        <TextInput
          autoComplete="off"
          name="url"
          size="sm"
          radius="sm"
          styles={{
            input: {
              width: 235,
            },
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') {
              return;
            }

            event.preventDefault();
            event.stopPropagation();

            const target = event.target as HTMLInputElement;

            onSave && onSave(target.value);
          }}
          {...textInputProps}
        />
        {children}
      </Box>
    </Flex>
  );
};

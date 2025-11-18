import { Box, COLOR_PALETTE, Group } from '@inflearn/ds-react';

import type { ColorOption } from '../constants';
import { COLOR_OPTIONS } from '../constants';

interface ColorPickerDropdownProps {
  colors?: ColorOption[];
  value?: string;
  onChange?: (color: string) => void;
}

export const ColorPicker = ({
  colors = COLOR_OPTIONS,
  value,
  onChange,
}: ColorPickerDropdownProps) => (
  <Group spacing={4} noWrap>
    {colors.map((colorOption) => {
      const isSelected = colorOption.name === value;

      return (
        <Box
          key={colorOption.value}
          w={24}
          h={24}
          css={{
            borderRadius: '4px',
            backgroundColor: colorOption.value,
            border: isSelected
              ? `1px solid ${COLOR_PALETTE.gray[7]}`
              : '1px solid rgba(0, 0, 0, 0.05)',
            cursor: 'pointer',
          }}
          onClick={() => {
            onChange?.(colorOption.name);
          }}
        />
      );
    })}
  </Group>
);

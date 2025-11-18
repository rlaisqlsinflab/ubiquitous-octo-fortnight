import { Box, COLOR_PALETTE, Group } from '@inflearn/ds-react';

import { COLOR_LOOKUP, COLORS } from '../constants';

export const ToggleIcon = ({
  value,
  color,
  onChange,
}: {
  value: boolean;
  color: string;
  onChange: (value: boolean) => void;
}) => (
  <Group>
    <Box
      w={24}
      h={24}
      onClick={() => onChange(!value)}
      css={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        cursor: 'pointer',
        svg: {
          width: 20,
          height: 20,
          fill: value ? COLOR_PALETTE.gray[7] : COLOR_PALETTE.gray[5],
        },
        '&:hover': {
          border: '1px solid rgba(0, 0, 0, 0.20)',
        },
      }}
      dangerouslySetInnerHTML={{
        __html: COLOR_LOOKUP[color]?.icon || COLOR_LOOKUP[COLORS.BLUE].icon,
      }}
    />
  </Group>
);

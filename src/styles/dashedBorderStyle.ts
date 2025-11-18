import { COLOR_PALETTE } from '@inflearn/ds-react';
import type { Sx } from '@mantine/core';

// NOTE: 디자인 시스템 Dropzone의 border 스타일과 동일합니다.
export const dashedBorderStyle: Sx = {
  borderWidth: '1px',
  borderStyle: 'dashed',
  borderColor: COLOR_PALETTE.gray[4],
  borderRadius: '4px',
};

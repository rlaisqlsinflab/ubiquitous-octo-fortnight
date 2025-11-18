import { Box } from '@inflearn/ds-react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function VersionHistoryList({ children, className }: Props) {
  return (
    <Box
      component="ul"
      m={0}
      p={0}
      className={className}
      css={{
        listStyle: 'none',
      }}>
      {children}
    </Box>
  );
}

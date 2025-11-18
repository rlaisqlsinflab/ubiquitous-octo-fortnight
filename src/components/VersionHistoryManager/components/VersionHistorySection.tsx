import { COLOR_PALETTE, Title } from '@inflearn/ds-react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function VersionHistorySection({ children }: Props) {
  return (
    <Title
      order={3}
      px={16}
      py={10}
      m={0}
      color="gray.7"
      css={{
        backgroundColor: COLOR_PALETTE.gray[1],
        borderBottom: `1px solid ${COLOR_PALETTE.gray[3]}`,
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '150%',
      }}>
      {children}
    </Title>
  );
}

import { Text } from '@inflearn/ds-react';

import { getHistoryName } from '../..';
import type { History } from '../../types';

type Props = {
  origin: History['origin'];
  className?: string;
};

export function VersionHistoryStatusDescription({ origin, className }: Props) {
  if (!origin) {
    return null;
  }

  return (
    <Text
      className={className}
      pl={2}
      size="xs"
      fw="500"
      m={0}
      color="gray.9"
      css={{
        wordBreak: 'break-all',
      }}>
      {getHistoryName(origin)}로 부터 복원됨
    </Text>
  );
}

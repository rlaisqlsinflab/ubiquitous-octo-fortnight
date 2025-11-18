import { Text } from '@inflearn/ds-react';

import type { History } from '../../types';
import { HISTORY_TYPE } from '../../types';

type Props = {
  type: History['type'];
  name: History['name'];
  className?: string;
};

export function VersionHistoryWriter({ type, name, className }: Props) {
  return (
    <Text pl={2} size="sm" fw="500" m={0} color="gray.6" className={className}>
      {name} {HISTORY_TYPE_DESCRIPTION_LOOKUP[type]}
    </Text>
  );
}

const HISTORY_TYPE_DESCRIPTION_LOOKUP = {
  [HISTORY_TYPE.AUTO]: '자동저장',
  [HISTORY_TYPE.DRAFT]: '임시저장',
  [HISTORY_TYPE.MANUAL]: '저장',
  [HISTORY_TYPE.RESTORE]: '복원',
  [HISTORY_TYPE.PUBLISH]: null,
};

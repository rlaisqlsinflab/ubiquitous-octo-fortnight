import { Badge } from '@inflearn/ds-react';

import type { History } from '../../types';
import { HISTORY_TYPE } from '../../types';

type Props = {
  type: History['type'];
};

export function VersionHistoryStatusBadge({ type }: Props) {
  const isPublishType = type === HISTORY_TYPE.PUBLISH;

  if (isPublishType) {
    return (
      <Badge variant="filled" color="infgreen" radius="sm" size="xs">
        게시
      </Badge>
    );
  }

  return null;
}

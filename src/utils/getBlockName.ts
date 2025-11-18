import type { SerializedNode } from '@craftjs/core';

import { isBlockTypeName } from '../components/Grid/utils';

export const getBlockName = (node: SerializedNode) => {
  if (isBlockTypeName(node?.displayName)) {
    return node.displayName;
  }

  const _diplayName = node?.type;

  if (typeof _diplayName !== 'string') {
    return _diplayName.resolvedName;
  }

  return _diplayName;
};

import type { SerializedNode } from '@craftjs/core';

import { isBlockTypeName } from '../components/Grid/utils';
import type { BlockType } from '../context/ExternalHandlerContext';

export const getBlockType = (
  blockElement: (SerializedNode & { displayName: BlockType }) | null
) => {
  if (!blockElement) {
    return null;
  }

  if (isBlockTypeName(blockElement.displayName)) {
    return blockElement.displayName;
  }

  if (typeof blockElement.type === 'string' && isBlockTypeName(blockElement.type)) {
    return blockElement.type;
  }

  if (typeof blockElement.type !== 'string' && isBlockTypeName(blockElement.type.resolvedName)) {
    return blockElement.type.resolvedName;
  }

  return null;
};

import type { SerializedNodes } from '@craftjs/core';
import { isNil } from 'lodash-es';

const EMPTY_CONTENT_ITEM_LENGTH = 7;

export function checkIsEmptyContent(serializedNodes: SerializedNodes) {
  if (isNil(serializedNodes)) {
    return false;
  }

  const keys = Object.keys(serializedNodes);

  if (keys.length !== EMPTY_CONTENT_ITEM_LENGTH) {
    return false;
  }

  const lastNodeType = serializedNodes[keys[6]].type;

  if (typeof lastNodeType !== 'string' && lastNodeType.resolvedName === 'AddElementBox') {
    return true;
  }

  return false;
}

import { includes } from 'lodash-es';

import type { BlockType, ElementType } from '../../context/ExternalHandlerContext';
import { BLOCK_TYPES, ELEMENT_TYPES } from '../../context/ExternalHandlerContext';

export type BlockProps = {
  scrollWhenCreated?: boolean;
  focusWhenCreated?: boolean;
};

export function isBlockTypeName(componentName: string): componentName is BlockType {
  return includes(BLOCK_TYPES, componentName);
}

export function isElementTypeName(elementName: string): elementName is ElementType {
  return includes(ELEMENT_TYPES, elementName);
}

import type { SerializedNodeData } from '@craftjs/core';
import { isNil, isString } from 'lodash-es';

import { resolver as defaultResolver } from '../components/Builder';

export const filterNodesWithResolver = (
  value: string | null,
  resolver: Record<string, unknown> = defaultResolver
) => {
  if (isNil(value)) {
    return value;
  }

  const parsedNodeList = JSON.parse(value) as Record<string, SerializedNodeData>;

  const targetKeys: string[] = [];
  const entriesNodes = value ? Object.entries(parsedNodeList) : [];

  // NOTE: resolver에 없는 node들 제거 및 targetKeys에 추가
  const nodeFilteredNodes = entriesNodes.filter(([key, node]) => {
    if (isString(node.type)) {
      return true;
    }

    const hasNodeInResolver = Object.keys(resolver).includes(node.type.resolvedName);

    if (!hasNodeInResolver) {
      targetKeys.push(key);
    }

    return hasNodeInResolver;
  });

  // NOTE: child node에 있는 targetKeys 제거
  const childNodeFilteredNodes = nodeFilteredNodes.map(([key, node]) => {
    const filteredChildNodes = node.nodes.filter((childNode) => !targetKeys.includes(childNode));

    return [
      key,
      {
        ...node,
        nodes: filteredChildNodes,
      },
    ] as const;
  });

  return JSON.stringify(Object.fromEntries(childNodeFilteredNodes));
};

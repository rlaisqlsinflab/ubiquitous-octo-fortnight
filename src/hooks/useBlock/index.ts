import type { SerializedNode } from '@craftjs/core';
import { useEditor, useNode } from '@craftjs/core';

import { isBlockTypeName } from '../../components/Grid/utils';
import type { BlockType } from '../../context/ExternalHandlerContext';
import { getBlockName } from '../../utils/getBlockName';

export const useBlock = () => {
  const {
    query: { getSerializedNodes },
  } = useEditor();
  const { id } = useNode();

  const serializedNodes = getSerializedNodes();

  const findBlockElement = () => {
    const stack: string[] = [id];

    while (stack.length > 0) {
      const currentId = stack.pop(); // 스택에서 노드를 꺼냄

      if (!currentId) {
        return null;
      }

      const currentNode = serializedNodes[currentId];

      const displayName = getBlockName(currentNode);

      if (isBlockTypeName(displayName)) {
        return currentNode as SerializedNode & { displayName: BlockType }; // 블록 요소를 찾았으면 반환
      }

      if (currentNode.parent === 'ROOT' || !currentNode.parent) {
        // 루트 노드에 도달하면 종료
        return null;
      }

      stack.push(currentNode.parent); // 부모 노드를 스택에 추가
    }

    return null; // 블록 요소를 찾지 못한 경우 null 반환
  };

  return {
    findBlockElement,
  };
};
